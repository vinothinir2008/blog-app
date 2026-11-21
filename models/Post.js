const mongoose = require('mongoose');
module.exports = mongoose.model('Post', new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authorName: String,
  createdAt: { type: Date, default: Date.now }
}));