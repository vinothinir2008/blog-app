const mongoose = require('mongoose');
module.exports = mongoose.model('Comment', new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authorName: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
}));