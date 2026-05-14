const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  public_id: { type: String, required: true },
  size: { type: Number },
  filetype: { type: String },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);
module.exports = File;