const express = require('express');
const router = express.Router();
const News = require('../models/News');
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

// @route   GET /api/news
// @desc    Get all news articles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 }); // sort by date descending
    res.json(news);
  } catch (err) {
    console.error("Fetch news error:", err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/news/:id
// @desc    Get single news article
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (err) {
    console.error("Fetch single news error:", err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/news/upload-image
// @desc    Upload an image for professional content sections
// @access  Admin/Private
router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided' });
  }
  const imageUrl = `/${req.file.path.replace(/\\/g, '/')}`;
  res.json({ imageUrl });
});

// @route   POST /api/news
// @desc    Create a new news article
// @access  Admin/Private
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, category, description, date, featured } = req.body;

    if (!title || !category || !description || !date) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Image upload is required' });
    }

    // Convert file path to be accessible via URL
    const imagePath = `/${req.file.path.replace(/\\/g, '/')}`;

    let finalDescription = description;
    try {
      if (typeof description === 'string' && (description.startsWith('{') || description.startsWith('['))) {
        finalDescription = JSON.parse(description);
      }
    } catch (e) {
      finalDescription = description;
    }

    const newArticle = new News({
      title,
      category,
      description: finalDescription,
      date,
      image: imagePath,
      featured: featured === 'true' || featured === true
    });

    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (err) {
    console.error("Create news error:", err);
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/news/:id
// @desc    Update a news article
// @access  Admin/Private
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, category, description, date, featured } = req.body;
    let article = await News.findById(req.params.id);

    if (!article) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: 'Article not found' });
    }

    // Update fields
    if (title) article.title = title;
    if (category) article.category = category;
    if (description) {
      try {
        if (typeof description === 'string' && (description.startsWith('{') || description.startsWith('['))) {
          article.description = JSON.parse(description);
        } else {
          article.description = description;
        }
      } catch (e) {
        article.description = description;
      }
    }
    if (date) article.date = date;
    if (featured !== undefined) article.featured = featured === 'true' || featured === true;

    // Handle new image upload
    if (req.file) {
        // Delete old image if it's local
        if (article.image && article.image.startsWith('/uploads/')) {
            const oldImagePath = path.join(process.cwd(), article.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }
        article.image = `/${req.file.path.replace(/\\/g, '/')}`;
    }

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (err) {
    console.error("Update news error:", err);
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/news/:id
// @desc    Delete a news article
// @access  Admin/Private
router.delete('/:id', async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Make sure we delete local files
    if (article.image && article.image.startsWith('/uploads/')) {
        const imagePath = path.join(process.cwd(), article.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }

    await article.deleteOne();
    res.json({ message: 'Article removed' });
  } catch (err) {
    console.error("Delete news error:", err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
