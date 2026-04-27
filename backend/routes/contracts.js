const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');
const ContractTemplate = require('../models/ContractTemplate');
const Notification = require('../models/Notification');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');

// ---------- Templates ----------

// Get all templates
router.get('/templates', protect, async (req, res) => {
    try {
        let templates = await ContractTemplate.find({ isActive: true });
        
        // Auto-seed basic templates if none exist
        if (templates.length === 0) {
            templates = await ContractTemplate.insertMany([
                { 
                    name: 'Standard Employment Contract', 
                    type: 'Employee', 
                    content: '<h1>Employment Agreement</h1><p>This agreement is between {{company_name}} and {{employee_name}}...</p>',
                    description: 'Basic full-time employment agreement.'
                },
                { 
                    name: 'Internship Agreement', 
                    type: 'Intern', 
                    content: '<h1>Internship Agreement</h1><p>This internship is for a period of...</p>',
                    description: 'Educational internship terms.'
                },
                { 
                    name: 'Non-Disclosure Agreement (NDA)', 
                    type: 'Freelancer', 
                    content: '<h1>NDA</h1><p>The recipient agrees to keep all information confidential...</p>',
                    description: 'Confidentiality agreement for freelancers/vendors.'
                }
            ]);
        }
        res.json(templates);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching templates' });
    }
});

// Create a template
router.post('/templates', protect, adminOnly, async (req, res) => {
    try {
        const template = await ContractTemplate.create(req.body);
        res.status(201).json(template);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ---------- Contracts ----------

// Create a new contract instance (HR/Admin)
router.post('/', protect, adminOnly, async (req, res) => {
    try {
        // Handle empty date strings to prevent Mongoose validation errors
        const contractData = { ...req.body };
        if (contractData.validFrom === "") delete contractData.validFrom;
        if (contractData.validUntil === "") delete contractData.validUntil;

        const contract = new Contract({
            ...contractData,
            createdBy: req.user._id,
        });
        await contract.save();

        // If submitted for approval immediately
        if (contract.status === 'Pending_Manager') {
            await Notification.create({
                type: 'Contract Approval',
                title: 'New Contract for Review',
                message: `A new contract "${contract.title}" requires Manager review.`,
                link: '/admin/contracts'
            });
        }

        res.status(201).json(contract);
    } catch (err) {
        // Provide clearer validation errors
        const message = err.name === 'ValidationError' 
            ? Object.values(err.errors).map(e => e.message).join(', ')
            : err.message;
        res.status(400).json({ error: message });
    }
});

// Get all contracts (Admin list with filtering)
router.get('/', protect, adminOnly, async (req, res) => {
    try {
        let query = {};
        const role = req.user.adminSubRole;

        // Filter based on what the role needs to see
        if (role === 'Manager') query.status = 'Pending_Manager';
        else if (role === 'HR') query.status = { $in: ['Pending_HR', 'Draft', 'Rejected'] };
        else if (role === 'Legal') query.status = 'Pending_Legal';
        else if (req.user.role === 'super-admin') {
            // Super Admin sees all or specifically Pending_Final
            if (req.query.pendingFinal) query.status = 'Pending_Final';
        }

        const contracts = await Contract.find(query)
            .populate('employeeId', 'firstName lastName email')
            .sort({ createdAt: -1 });
        res.json(contracts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching contracts' });
    }
});

// Get user's own contracts
router.get('/my-contracts', protect, async (req, res) => {
    try {
        const contracts = await Contract.find({ 
            employeeId: req.user._id,
            status: { $in: ['Pending_Signature', 'Active', 'Expired'] }
        }).sort({ createdAt: -1 });
        res.json(contracts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching your contracts' });
    }
});

// Approve a contract
router.put('/:id/approve', protect, adminOnly, async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (!contract) return res.status(404).json({ message: 'Contract not found' });

        const role = req.user.adminSubRole;
        const isSuper = req.user.role === 'super-admin';

        // Workflow state machine
        if (contract.status === 'Pending_Manager' && role === 'Manager') {
            contract.status = 'Pending_HR';
        } else if (contract.status === 'Pending_HR' && role === 'HR') {
            contract.status = 'Pending_Legal';
        } else if (contract.status === 'Pending_Legal' && role === 'Legal') {
            contract.status = 'Pending_Final';
        } else if (contract.status === 'Pending_Final' && isSuper) {
            contract.status = 'Pending_Signature';
        } else {
            return res.status(403).json({ message: 'You are not authorized to approve this step.' });
        }

        contract.approvals.push({
            role: isSuper ? 'SuperAdmin' : role,
            userId: req.user._id,
            status: 'Approved',
            comments: req.body.comments
        });

        await contract.save();

        // Notify next role
        let nextRole = '';
        if (contract.status === 'Pending_HR') nextRole = 'HR';
        else if (contract.status === 'Pending_Legal') nextRole = 'Legal';
        else if (contract.status === 'Pending_Final') nextRole = 'Super Admin';
        else if (contract.status === 'Pending_Signature') {
             // Notify Employee
             // (Implementation of employee notification could go here)
        }

        if (nextRole) {
            await Notification.create({
                type: 'Contract Approval',
                title: 'Contract Approved (Next Step)',
                message: `Contract "${contract.title}" has been approved and moved to ${nextRole}.`,
                link: '/admin/contracts'
            });
        }

        res.json(contract);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Reject a contract
router.put('/:id/reject', protect, adminOnly, async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (!contract) return res.status(404).json({ message: 'Contract not found' });

        contract.status = 'Rejected';
        contract.approvals.push({
            role: req.user.role === 'super-admin' ? 'SuperAdmin' : req.user.adminSubRole,
            userId: req.user._id,
            status: 'Rejected',
            comments: req.body.comments
        });

        await contract.save();
        res.json(contract);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Sign a contract (Employee)
router.put('/:id/sign', protect, async (req, res) => {
    try {
        const contract = await Contract.findOne({ 
            _id: req.params.id, 
            employeeId: req.user._id,
            status: 'Pending_Signature'
        });

        if (!contract) return res.status(404).json({ message: 'Contract not available for signing.' });

        contract.signature = {
            isSigned: true,
            signedAt: new Date(),
            signatureName: req.body.signatureName,
            signatureIp: req.ip
        };
        contract.status = 'Active';

        await contract.save();
        res.json(contract);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
