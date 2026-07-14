const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');

const Report = require('../models/Report');
const ReportRequest = require('../models/ReportRequest');
const Notification = require('../models/Notification');

// @route   GET /api/reports/requests
// @desc    Get all report requests (Admin)
// @access  Public
router.get('/requests', async (req, res) => {
  try {
    const requests = await ReportRequest.find().sort({ createdAt: -1 }).populate('reportId', 'title');
    res.json(requests);
  } catch (err) {
    console.error('Fetch report requests error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/reports
// @desc    Get all reports
// @access  Public
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    console.error('Fetch reports error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/reports/:id
// @desc    Get report details by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  } catch (err) {
    console.error('Fetch report detail error:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/reports
// @desc    Create a new report
// @access  Private (Admin)
router.post('/', async (req, res) => {
  try {
    const newReport = new Report(req.body);
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (err) {
    console.error('Create report error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/reports/:id
// @desc    Update a report
// @access  Private (Admin)
router.put('/:id', async (req, res) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedReport);
  } catch (err) {
    console.error('Update report error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/reports/:id
// @desc    Delete a report
// @access  Private (Admin)
router.delete('/:id', async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: 'Report deleted' });
  } catch (err) {
    console.error('Delete report error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/reports/:id/download
// @desc    Download the dynamically generated report PDF
// @access  Public
router.get('/:id/download', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).send('Report not found');
    }

    // Create a PDF Document
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 }
    });

    // Set response headers
    const safeTitle = report.title.replace(/[^a-zA-Z0-9]/g, '_');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${safeTitle}.pdf"`);

    // Stream to response
    doc.pipe(res);

    // Styling & Theme (The Contractum Brand Red: #ea062b)
    const brandRed = '#ea062b';
    const darkSlate = '#0f172a';
    const bodyText = '#334155';
    const lightGray = '#f8fafc';
    const borderGray = '#e2e8f0';

    // Header Background Accent Bar
    doc.rect(0, 0, 595.28, 110).fill(darkSlate);

    // Load logo if exists
    const logoPath = path.join(__dirname, '..', 'logo.png');
    let textOffsetX = 50;

    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 30, { width: 50 });
      textOffsetX = 115;
    }

    // Company Brand Name & Subtext
    doc.fillColor(brandRed).fontSize(18).font('Helvetica-Bold').text('THE CONTRACTUM', textOffsetX, 35);
    doc.fillColor('#ffffff').fontSize(9).font('Helvetica').text('ANNUAL REPORTS & RESEARCH PUBLICATIONS', textOffsetX, 58);

    // Top Right Corner Page Label
    doc.fillColor('#94a3b8').fontSize(8).font('Helvetica-Bold').text('OFFICIAL REPORT', 400, 38, { align: 'right', width: 145 });
    doc.text(`ID: REP-${report._id.toString().substring(18).toUpperCase()}`, 400, 52, { align: 'right', width: 145 });

    // Document Body Title
    doc.y = 145;
    doc.fillColor(darkSlate).fontSize(20).font('Helvetica-Bold').text(report.title, {
      align: 'left',
      lineGap: 4
    });

    // Metadata Ribbon Divider Bar
    doc.moveDown(0.5);
    const ribbonY = doc.y;
    doc.rect(50, ribbonY, 495.28, 25).fill(lightGray);
    doc.rect(50, ribbonY, 4, 25).fill(brandRed);

    doc.fillColor(darkSlate).fontSize(9).font('Helvetica-Bold').text('Type: ', 65, ribbonY + 8, { continued: true })
       .font('Helvetica').text(`${report.type}   |   `, { continued: true })
       .font('Helvetica-Bold').text('Published: ', { continued: true })
       .font('Helvetica').text(`${report.publicationDate}   |   `, { continued: true })
       .font('Helvetica-Bold').text('Length: ', { continued: true })
       .font('Helvetica').text(`${report.pages} pages`);

    // Content Block (Description)
    doc.y = ribbonY + 45;
    doc.fillColor(darkSlate).fontSize(13).font('Helvetica-Bold').text('REPORT DESCRIPTION');
    
    // Underline
    doc.moveTo(50, doc.y + 3).lineTo(180, doc.y + 3).lineWidth(1.5).stroke(brandRed);
    
    doc.y += 12;
    doc.fillColor(bodyText).fontSize(10).font('Helvetica').text(report.description, {
      align: 'justify',
      lineGap: 4
    });

    doc.moveDown(1.5);
    const highlightsY = doc.y;

    // Highlights Section
    doc.fillColor(darkSlate).fontSize(13).font('Helvetica-Bold').text('KEY REPORT HIGHLIGHTS', 50, highlightsY);
    doc.moveTo(50, doc.y + 3).lineTo(190, doc.y + 3).lineWidth(1.5).stroke(brandRed);
    doc.y += 12;

    report.highlights.forEach(highlight => {
      doc.fillColor(bodyText).fontSize(9.5).font('Helvetica').text(`✔  ${highlight}`, { lineGap: 4 });
    });

    // Company Details Section Card
    doc.y = Math.max(doc.y, highlightsY + 130);
    const cardY = doc.y + 20;
    doc.rect(50, cardY, 495.28, 75).fill(lightGray).stroke(borderGray);
    doc.rect(50, cardY, 4, 75).fill(brandRed);
    
    doc.fillColor(darkSlate).fontSize(9.5).font('Helvetica-Bold').text('ABOUT THE CONTRACTUM', 65, cardY + 10);
    doc.fillColor(bodyText).fontSize(8.5).font('Helvetica').text('The Contractum is a premier enterprise systems consulting group specializing in automated workflows, intelligent contract management software, and AI-driven business intelligence. Our research wing publishes technical briefs to assist organizations in system audits and digital transformations.', 65, cardY + 23, { width: 465, lineGap: 2 });
    doc.fillColor(brandRed).fontSize(8).font('Helvetica-Bold').text('Web: www.thecontractum.com  |  Email: research@thecontractum.com  |  HQ: Tech District Suite 400', 65, cardY + 56);

    // Footer Layout
    const footerY = 780;
    doc.rect(50, footerY - 15, 495.28, 1).fill(borderGray);
    doc.fillColor('#94a3b8').fontSize(8).font('Helvetica').text('© 2026 The Contractum. All rights reserved. Technical publication intended for business insights.', 50, footerY, { align: 'center', width: 495.28 });

    doc.end();

  } catch (err) {
    console.error('Download report PDF error:', err);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/reports/:id/request
// @desc    Request download/access a report (Lead capture)
// @access  Public
router.post('/:id/request', async (req, res) => {
  try {
    const { fullName, email, contact, company, jobTitle } = req.body;
    
    if (!fullName || !email || !contact || !company) {
      return res.status(400).json({ message: 'Name, email, contact, and company are required fields.' });
    }

    if (!email.endsWith("@gmail.com")) {
      return res.status(400).json({ message: "Only @gmail.com email addresses are allowed." });
    }
    if (contact.replace(/\D/g, "").length !== 10) {
      return res.status(400).json({ message: "Contact number must be exactly 10 digits." });
    }

    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Save lead details
    const newRequest = new ReportRequest({
      reportId: report._id,
      fullName,
      email,
      contact,
      company,
      jobTitle: jobTitle || ''
    });
    await newRequest.save();

    // Increment downloads count
    report.downloads = (report.downloads || 0) + 1;
    await report.save();

    // Create admin notification
    await Notification.create({
      type: 'Report Request',
      title: 'New Report Lead',
      message: `${fullName} from ${company} requested "${report.title}"`,
      link: '/admin/submissions'
    });

    // Construct the absolute download URL from the backend request host
    const apiBaseUrl = `${req.protocol}://${req.get('host')}`;
    const dynamicPdfUrl = `${apiBaseUrl}/api/reports/${report._id}/download`;

    res.status(201).json({
      success: true,
      message: 'Access granted successfully!',
      pdfUrl: dynamicPdfUrl,
      downloads: report.downloads
    });

  } catch (err) {
    console.error('Report request error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
