const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const Whitepaper = require('../models/Whitepaper');
const WhitepaperRequest = require('../models/WhitepaperRequest');
const Notification = require('../models/Notification');

// @route   GET /api/whitepapers
// @desc    Get all whitepapers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const whitepapers = await Whitepaper.find().sort({ createdAt: -1 });
    res.json(whitepapers);
  } catch (err) {
    console.error('Fetch whitepapers error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/whitepapers/:id
// @desc    Get a single whitepaper's details
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const whitepaper = await Whitepaper.findById(req.params.id);
    if (!whitepaper) {
      return res.status(404).json({ message: 'Whitepaper not found' });
    }
    res.json(whitepaper);
  } catch (err) {
    console.error('Fetch whitepaper details error:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Whitepaper not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/whitepapers/:id/download
// @desc    Download the dynamically generated whitepaper PDF
// @access  Public
router.get('/:id/download', async (req, res) => {
  try {
    const whitepaper = await Whitepaper.findById(req.params.id);
    if (!whitepaper) {
      return res.status(404).send('Whitepaper not found');
    }

    // Create a PDF Document
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 }
    });

    // Set response headers
    const safeTitle = whitepaper.title.replace(/[^a-zA-Z0-9]/g, '_');
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
    doc.fillColor('#ffffff').fontSize(9).font('Helvetica').text('TECHNICAL RESEARCH LIBRARY & RESOURCE CENTRE', textOffsetX, 58);

    // Top Right Corner Page Label
    doc.fillColor('#94a3b8').fontSize(8).font('Helvetica-Bold').text('OFFICIAL WHITE PAPER', 400, 38, { align: 'right', width: 145 });
    doc.text(`ID: WP-${whitepaper._id.toString().substring(18).toUpperCase()}`, 400, 52, { align: 'right', width: 145 });

    // Document Body Title
    doc.y = 145;
    doc.fillColor(darkSlate).fontSize(22).font('Helvetica-Bold').text(whitepaper.title, {
      align: 'left',
      lineGap: 4
    });

    // Metadata Ribbon Divider Bar
    doc.moveDown(0.5);
    const ribbonY = doc.y;
    doc.rect(50, ribbonY, 495.28, 25).fill(lightGray);
    doc.rect(50, ribbonY, 4, 25).fill(brandRed);

    doc.fillColor(darkSlate).fontSize(9).font('Helvetica-Bold').text('Category: ', 65, ribbonY + 8, { continued: true })
       .font('Helvetica').text(`${whitepaper.category}   |   `, { continued: true })
       .font('Helvetica-Bold').text('Published: ', { continued: true })
       .font('Helvetica').text(`${whitepaper.publicationDate}   |   `, { continued: true })
       .font('Helvetica-Bold').text('Length: ', { continued: true })
       .font('Helvetica').text(`${whitepaper.pages} pages`);

    // Content Block (Abstract)
    doc.y = ribbonY + 45;
    doc.fillColor(darkSlate).fontSize(14).font('Helvetica-Bold').text('ABSTRACT');
    
    // Abstract Underline
    doc.moveTo(50, doc.y + 3).lineTo(120, doc.y + 3).lineWidth(1.5).stroke(brandRed);
    
    doc.y += 12;
    doc.fillColor(bodyText).fontSize(10.5).font('Helvetica').text(whitepaper.abstract, {
      align: 'justify',
      lineGap: 5
    });

    doc.moveDown(1.5);

    // Two Column Layout for Authors & Key Topics
    const colsY = doc.y;
    
    // Left Column: Research Authors
    doc.fillColor(darkSlate).fontSize(12).font('Helvetica-Bold').text('RESEARCH AUTHORS', 50, colsY);
    doc.moveTo(50, doc.y + 3).lineTo(150, doc.y + 3).lineWidth(1).stroke(brandRed);
    doc.y += 10;
    
    whitepaper.authors.forEach(author => {
      doc.fillColor(bodyText).fontSize(10).font('Helvetica').text(`• ${author}`, { lineGap: 3 });
    });

    // Right Column: Key Topics
    doc.fillColor(darkSlate).fontSize(12).font('Helvetica-Bold').text('KEY TECHNICAL TOPICS', 300, colsY);
    doc.moveTo(300, doc.y + 3).lineTo(420, doc.y + 3).lineWidth(1).stroke(brandRed);
    doc.y += 10;
    
    whitepaper.keyTopics.forEach(topic => {
      doc.fillColor(bodyText).fontSize(10).font('Helvetica').text(`✔ ${topic}`, 300, doc.y, { lineGap: 3 });
    });

    // Company Details Section Card
    doc.y = Math.max(doc.y, colsY + 120); // ensure we don't overlap with the columns
    const cardY = doc.y + 25;
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
    console.error('Download whitepaper PDF error:', err);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/whitepapers/:id/request
// @desc    Request access/download a whitepaper (Lead capture)
// @access  Public
router.post('/:id/request', async (req, res) => {
  try {
    const { fullName, email, company, jobTitle } = req.body;
    
    if (!fullName || !email || !company) {
      return res.status(400).json({ message: 'Name, email, and company are required fields.' });
    }

    const whitepaper = await Whitepaper.findById(req.params.id);
    if (!whitepaper) {
      return res.status(404).json({ message: 'Whitepaper not found' });
    }

    // Save lead details
    const newRequest = new WhitepaperRequest({
      whitepaperId: whitepaper._id,
      fullName,
      email,
      company,
      jobTitle: jobTitle || ''
    });
    await newRequest.save();

    // Increment download count
    whitepaper.downloadCount = (whitepaper.downloadCount || 0) + 1;
    await whitepaper.save();

    // Create admin notification
    await Notification.create({
      type: 'Whitepaper Request',
      title: 'New Whitepaper Lead',
      message: `${fullName} from ${company} requested "${whitepaper.title}"`,
      link: '/admin/submissions' // general leads area
    });

    // Construct the absolute download URL from the backend request host
    const apiBaseUrl = `${req.protocol}://${req.get('host')}`;
    const dynamicPdfUrl = `${apiBaseUrl}/api/whitepapers/${whitepaper._id}/download`;

    res.status(201).json({
      success: true,
      message: 'Access granted successfully!',
      pdfUrl: dynamicPdfUrl,
      downloadCount: whitepaper.downloadCount
    });

  } catch (err) {
    console.error('Whitepaper request error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
