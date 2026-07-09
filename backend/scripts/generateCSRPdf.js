const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

async function generateCSRPDF() {
  const outputPath = path.join(__dirname, '../../frontend/public/pdf/CSR_Report.pdf');
  
  // Create directory if it doesn't exist
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 50, left: 50, right: 50 }
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Styling & Theme colors
  const brandGreen = '#10b981';
  const brandDark = '#064e3b';
  const darkSlate = '#0f172a';
  const bodyText = '#334155';
  const lightGray = '#f8fafc';

  // Header Background
  doc.rect(0, 0, 595.28, 120).fill(brandDark);

  doc.fillColor('#ffffff').fontSize(24).font('Helvetica-Bold').text('THE CONTRACTUM', 50, 40);
  doc.fillColor('#a7f3d0').fontSize(10).font('Helvetica').text('Corporate Social Responsibility & Sustainability', 50, 70);

  doc.y = 150;
  doc.fillColor(darkSlate).fontSize(22).font('Helvetica-Bold').text('Sustainability & Impact Report 2024', { align: 'left' });

  doc.moveDown(1);
  doc.fillColor(brandGreen).fontSize(14).font('Helvetica-Bold').text('1. Carbon Neutrality & Environmental Action');
  doc.moveDown(0.5);
  doc.fillColor(bodyText).fontSize(11).font('Helvetica').text(
    'The Contractum is committed to achieving 100% carbon neutrality by 2027. In 2024, our green initiatives resulted in a 60% reduction in our overall corporate carbon footprint. We have planted over 50,000 trees globally and established zero e-waste policies across all technology centers.',
    { align: 'justify', lineGap: 4 }
  );

  doc.moveDown(1.5);
  doc.fillColor(brandGreen).fontSize(14).font('Helvetica-Bold').text('2. Digital Inclusion & Education');
  doc.moveDown(0.5);
  doc.fillColor(bodyText).fontSize(11).font('Helvetica').text(
    'Through our global education drives, we have provided digital literacy training and free coding bootcamps to over 15,000 underprivileged children and young adults. By supplying laptops and internet connectivity, we aim to bridge the digital divide in developing regions.',
    { align: 'justify', lineGap: 4 }
  );

  doc.moveDown(1.5);
  doc.fillColor(brandGreen).fontSize(14).font('Helvetica-Bold').text('3. Healthcare & Community Support');
  doc.moveDown(0.5);
  doc.fillColor(bodyText).fontSize(11).font('Helvetica').text(
    'Our mobile health clinics have reached over 150 remote villages, providing essential medical care, preventive screenings, and telemedicine access to more than 25,000 patients who previously lacked reliable healthcare infrastructure.',
    { align: 'justify', lineGap: 4 }
  );

  // Footer
  doc.rect(50, 780, 495.28, 1).fill('#e2e8f0');
  doc.fillColor('#94a3b8').fontSize(8).font('Helvetica').text('© 2026 The Contractum. All rights reserved. Generated automatically.', 50, 790, { align: 'center' });

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      console.log('Successfully generated CSR_Report.pdf at:', outputPath);
      resolve();
    });
    stream.on('error', reject);
  });
}

generateCSRPDF().catch(console.error);
