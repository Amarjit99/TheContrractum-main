const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine destination based on endpoint or a custom header
    let uploadPath = 'uploads/general';

    if (req.originalUrl.includes('interns')) {
      uploadPath = 'uploads/interns';
    } else if (req.originalUrl.includes('founders')) {
      uploadPath = 'uploads/founders';
    } else if (req.originalUrl.includes('news')) {
      uploadPath = 'uploads/news';
    } else if (req.originalUrl.includes('certificates')) {
      uploadPath = 'uploads/certificates';
    }

    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  console.log('Uploading file:', file.originalname, 'MimeType:', file.mimetype);
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error(`Only images and PDF files are allowed! (Detected: ${file.mimetype})`), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // Increased to 10MB for PDFs
});

module.exports = upload;
