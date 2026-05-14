const express = require('express');
const router = express.Router();
const { cloudinary, upload } = require('../config/cloudinary');
const File = require('../models/file.model');
const auth = require('../middleware/auth');

// Upload file
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const newFile = new File({
      filename: req.file.originalname,
      url: req.file.path,
      public_id: req.file.filename,
      size: req.file.size,
      filetype: req.file.mimetype,
      uploadedBy: req.user.id,
    });
    await newFile.save();
    res.redirect('/files');
  } catch (err) {
    console.error(err);
    res.status(500).send('Upload failed');
  }
});

// View all files
router.get('/', auth, async (req, res) => {
  try {
    const files = await File.find({ uploadedBy: req.user.id });
    res.render('files', { files, username: req.user.username });
  } catch (err) {
    res.status(500).send('Error fetching files');
  }
});

// Delete file
router.post('/delete/:id', auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).send('File not found');

    // Only allow owner to delete
    if (file.uploadedBy.toString() !== req.user.id) {
      return res.status(403).send('Forbidden');
    }

    await cloudinary.uploader.destroy(file.public_id, { resource_type: 'auto' });
    await File.findByIdAndDelete(req.params.id);
    res.redirect('/files');
  } catch (err) {
    console.error(err);
    res.status(500).send('Delete failed');
  }
});

module.exports = router;
