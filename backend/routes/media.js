const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const MediaKitRequest = require('../models/MediaKitRequest');
const Notification = require('../models/Notification');
const MediaItem = require('../models/MediaItem');
const PressRelease = require('../models/PressRelease');
const MediaCoverage = require('../models/MediaCoverage');
const MediaRelationRequest = require('../models/MediaRelationRequest');

// @route   POST /api/media/kit-request
// @desc    Request download of corporate media kit (lead capture)
// @access  Public
router.post('/kit-request', async (req, res) => {
  try {
    const { fullName, email, company } = req.body;
    
    if (!fullName || !email || !company) {
      return res.status(400).json({ message: 'Name, email, and company are required fields.' });
    }

    if (!email.toLowerCase().endsWith('@gmail.com')) {
      return res.status(400).json({ message: 'Only @gmail.com email addresses are allowed.' });
    }

    // Save lead details to database
    const newRequest = new MediaKitRequest({
      fullName,
      email,
      company
    });
    await newRequest.save();

    // Create admin notification
    await Notification.create({
      type: 'Media Kit Request',
      title: 'New Media Kit Lead',
      message: `${fullName} from ${company} requested the official Media Kit`,
      link: '/admin/leads'
    });

    const apiBaseUrl = `${req.protocol}://${req.get('host')}`;
    const downloadUrl = `${apiBaseUrl}/api/media/kit-download`;

    res.status(201).json({
      success: true,
      message: 'Lead captured successfully!',
      pdfUrl: downloadUrl
    });
  } catch (err) {
    console.error('Media kit request error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/media/relations-request
// @desc    Submit a media relations inquiry
// @access  Public
router.post('/relations-request', async (req, res) => {
  try {
    const { fullName, outlet, email, subject, message } = req.body;
    
    if (!fullName || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required fields.' });
    }

    if (!email.toLowerCase().endsWith('@gmail.com')) {
      return res.status(400).json({ message: 'Only @gmail.com email addresses are allowed.' });
    }

    const newRelationRequest = new MediaRelationRequest({
      fullName, outlet, email, subject, message
    });
    await newRelationRequest.save();

    await Notification.create({
      type: 'Media Inquiry',
      title: 'New Media Relations Request',
      message: `${fullName} submitted a media inquiry.`,
      link: '/admin/media'
    });

    res.status(201).json({ success: true, message: 'Inquiry submitted successfully!' });
  } catch (err) {
    console.error('Media relations request error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/media/kit-requests
// @desc    Get all media kit requests for the dashboard
// @access  Public
router.get('/kit-requests', async (req, res) => {
  try {
    const requests = await MediaKitRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error('Fetch media kit requests error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/media/relations-requests
// @desc    Get all media relations inquiries for the dashboard
// @access  Public
router.get('/relations-requests', async (req, res) => {
  try {
    const requests = await MediaRelationRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error('Fetch media relations requests error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/media/kit-download
// @desc    Download the dynamically generated Media Kit PDF
// @access  Public
router.get('/kit-download', async (req, res) => {
  try {
    // Create a PDF Document
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 }
    });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="TheContractum_Media_Kit.pdf"');

    // Stream to response
    doc.pipe(res);

    // Styling & Theme colors
    const brandRed = '#ea062b';
    const brandBlue = '#007BFF';
    const darkSlate = '#0f172a';
    const bodyText = '#334155';
    const lightGray = '#f8fafc';
    const borderGray = '#e2e8f0';

    // Header Background Accent Bar
    doc.rect(0, 0, 595.28, 110).fill(darkSlate);

    // Load logo if exists
    const path = require('path');
    const fs = require('fs');
    const logoPath = path.join(__dirname, '..', 'logo.png');
    let textOffsetX = 50;

    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 30, { width: 50 });
      textOffsetX = 115;
    }

    // Company Brand Name & Subtext
    doc.fillColor(brandRed).fontSize(18).font('Helvetica-Bold').text('THE CONTRACTUM', textOffsetX, 35);
    doc.fillColor('#ffffff').fontSize(9).font('Helvetica').text('OFFICIAL CORPORATE COMMUNICATIONS & BRAND RESOURCES', textOffsetX, 58);

    // Top Right Corner Page Label
    doc.fillColor('#94a3b8').fontSize(8).font('Helvetica-Bold').text('PRESS & MEDIA KIT', 400, 38, { align: 'right', width: 145 });
    doc.text('VERSION 2026.1', 400, 52, { align: 'right', width: 145 });

    // Document Body Title
    doc.y = 145;
    doc.fillColor(darkSlate).fontSize(22).font('Helvetica-Bold').text('Official Media & Press Kit', {
      align: 'left',
      lineGap: 4
    });

    // Metadata Ribbon Divider Bar
    doc.moveDown(0.5);
    const ribbonY = doc.y;
    doc.rect(50, ribbonY, 495.28, 25).fill(lightGray);
    doc.rect(50, ribbonY, 4, 25).fill(brandBlue);

    doc.fillColor(darkSlate).fontSize(9).font('Helvetica-Bold').text('Scope: ', 65, ribbonY + 8, { continued: true })
       .font('Helvetica').text('Corporate Identity & Assets   |   ', { continued: true })
       .font('Helvetica-Bold').text('Last Updated: ', { continued: true })
       .font('Helvetica').text('June 2026   |   ', { continued: true })
       .font('Helvetica-Bold').text('Security: ', { continued: true })
       .font('Helvetica').text('Public Access');

    // Section 1: Executive Overview
    doc.y = ribbonY + 45;
    doc.fillColor(darkSlate).fontSize(14).font('Helvetica-Bold').text('1. EXECUTIVE OVERVIEW');
    doc.moveTo(50, doc.y + 3).lineTo(200, doc.y + 3).lineWidth(1.5).stroke(brandBlue);
    
    doc.y += 12;
    doc.fillColor(bodyText).fontSize(10).font('Helvetica').text(
      'The Contractum is a global leader in enterprise digital transformation, smart contract orchestration, and workflow automation. Our software products enable Fortune 500 companies and government agencies to accelerate operational efficiency, satisfy audit compliance, and integrate intelligent artificial intelligence pipelines seamlessly. We publish reports and insights regularly to foster innovation in business technology.',
      { align: 'justify', lineGap: 4 }
    );

    // Section 2: Visual Brand Guidelines
    doc.moveDown(1.5);
    doc.fillColor(darkSlate).fontSize(14).font('Helvetica-Bold').text('2. BRAND REPRESENTATION & COLORS');
    doc.moveTo(50, doc.y + 3).lineTo(280, doc.y + 3).lineWidth(1.5).stroke(brandBlue);
    
    doc.y += 12;
    doc.fillColor(bodyText).fontSize(10).font('Helvetica').text(
      'The Contractum logo represents speed, compliance, and technological alignment. When displaying our logo in print or digital publications, ensure that clear padding is maintained on all sides, and that the logo colors are not distorted or scaled asynchronously.',
      { align: 'justify', lineGap: 4 }
    );

    doc.moveDown(1);
    const colorBlockY = doc.y;
    // Primary Red Color Block
    doc.rect(50, colorBlockY, 150, 45).fill(brandRed);
    doc.fillColor('#ffffff').fontSize(8.5).font('Helvetica-Bold').text('Contractum Red', 60, colorBlockY + 12);
    doc.font('Helvetica').text('HEX: #EA062B', 60, colorBlockY + 25);

    // Primary Blue Color Block
    doc.rect(220, colorBlockY, 150, 45).fill(brandBlue);
    doc.fillColor('#ffffff').fontSize(8.5).font('Helvetica-Bold').text('Contractum Blue', 230, colorBlockY + 12);
    doc.font('Helvetica').text('HEX: #007BFF', 230, colorBlockY + 25);

    // Slate Dark Block
    doc.rect(390, colorBlockY, 155, 45).fill(darkSlate);
    doc.fillColor('#ffffff').fontSize(8.5).font('Helvetica-Bold').text('Slate Dark', 400, colorBlockY + 12);
    doc.font('Helvetica').text('HEX: #0F172A', 400, colorBlockY + 25);

    // Section 3: Spokespersons & Inquiries
    doc.y = colorBlockY + 70;
    doc.fillColor(darkSlate).fontSize(14).font('Helvetica-Bold').text('3. KEY CONTACTS & INQUIRIES');
    doc.moveTo(50, doc.y + 3).lineTo(250, doc.y + 3).lineWidth(1.5).stroke(brandBlue);

    doc.y += 12;
    doc.fillColor(bodyText).fontSize(10).font('Helvetica').text(
      'For press inquiries, corporate statements, and interviews with executive management, please contact our Media Relations office directly. We aim to respond to all standard press inquiries within 4-6 business hours.',
      { align: 'justify', lineGap: 4 }
    );

    // Corporate Details Section Card
    doc.moveDown(1.5);
    const cardY = doc.y;
    doc.rect(50, cardY, 495.28, 75).fill(lightGray).stroke(borderGray);
    doc.rect(50, cardY, 4, 75).fill(brandBlue);
    
    doc.fillColor(darkSlate).fontSize(9.5).font('Helvetica-Bold').text('MEDIA RELATIONS DESK', 65, cardY + 10);
    doc.fillColor(bodyText).fontSize(8.5).font('Helvetica').text('Department: Corporate Communications & PR\nPress Hotline: +1 (555) 019-2834\nOffice Hours: 09:00 AM - 06:00 PM EST', 65, cardY + 23, { width: 465, lineGap: 3 });
    doc.fillColor(brandRed).fontSize(8).font('Helvetica-Bold').text('Website: www.thecontractum.com/resources/media-relations  |  Press Email: media@thecontractum.com', 65, cardY + 56);

    // Footer Layout
    const footerY = 780;
    doc.rect(50, footerY - 15, 495.28, 1).fill(borderGray);
    doc.fillColor('#94a3b8').fontSize(8).font('Helvetica').text('© 2026 The Contractum. All rights reserved. Brand guidelines and press media assets library.', 50, footerY, { align: 'center', width: 495.28 });

    doc.end();
  } catch (err) {
    console.error('Download Media Kit PDF error:', err);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/media/items
// @desc    Get all media items (Photos/Videos)
// @access  Public
router.get('/items', async (req, res) => {
  try {
    const items = await MediaItem.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.error('Fetch media items error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/media/press-releases
// @desc    Get all press releases
// @access  Public
router.get('/press-releases', async (req, res) => {
  try {
    const press = await PressRelease.find().sort({ date: -1 });
    res.json(press);
  } catch (err) {
    console.error('Fetch press releases error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/media/coverage
// @desc    Get all media coverage articles
// @access  Public
router.get('/coverage', async (req, res) => {
  try {
    const coverage = await MediaCoverage.find().sort({ date: -1 });
    res.json(coverage);
  } catch (err) {
    console.error('Fetch media coverage error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/media
// @desc    Create a new media item
// @access  Private
router.post('/', async (req, res) => {
  try {
    const newItem = new MediaItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error('Create media item error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/media/:id
// @desc    Update a media item
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await MediaItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Media item not found' });
    res.json(updatedItem);
  } catch (err) {
    console.error('Update media item error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/media/:id
// @desc    Delete a media item
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await MediaItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Media item not found' });
    res.json({ message: 'Media item deleted' });
  } catch (err) {
    console.error('Delete media item error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
