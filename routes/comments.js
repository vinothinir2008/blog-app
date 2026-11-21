const router = require('express').Router();
const Comment = require('../models/Comment');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

router.get('/post/:postId', async (req, res) =>
  res.json(await Comment.find({ post: req.params.postId }).sort({ createdAt: 1 })));

router.post('/post/:postId', auth, async (req, res) => {
  try {
    if (!req.body.text) return res.status(400).json({ msg: 'Comment is empty' });
    const user = await User.findById(req.user.id);
    res.json(await Comment.create({
      post: req.params.postId, author: user._id,
      authorName: user.name, text: req.body.text
    }));
  } catch (e) { res.status(500).json({ msg: e.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const c = await Comment.findById(req.params.id);
    if (!c) return res.status(404).json({ msg: 'Not found' });
    if (String(c.author) !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ msg: 'Not allowed' });
    await c.deleteOne();
    res.json({ msg: 'Deleted' });
  } catch (e) { res.status(500).json({ msg: e.message }); }
});

module.exports = router;