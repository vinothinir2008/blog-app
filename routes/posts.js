const router = require('express').Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

router.get('/', async (req, res) =>
  res.json(await Post.find().sort({ createdAt: -1 })));

router.get('/:id', async (req, res) => {
  try {
    const p = await Post.findById(req.params.id);
    if (!p) return res.status(404).json({ msg: 'Post not found' });
    res.json(p);
  } catch { res.status(404).json({ msg: 'Post not found' }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ msg: 'Title and content required' });
    const user = await User.findById(req.user.id);
    res.json(await Post.create({ title, content, author: user._id, authorName: user.name }));
  } catch (e) { res.status(500).json({ msg: e.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const p = await Post.findById(req.params.id);
    if (!p) return res.status(404).json({ msg: 'Post not found' });
    if (String(p.author) !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ msg: 'Not allowed' });
    p.title = req.body.title;
    p.content = req.body.content;
    res.json(await p.save());
  } catch (e) { res.status(500).json({ msg: e.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const p = await Post.findById(req.params.id);
    if (!p) return res.status(404).json({ msg: 'Post not found' });
    if (String(p.author) !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ msg: 'Not allowed' });
    await Comment.deleteMany({ post: p._id });
    await p.deleteOne();
    res.json({ msg: 'Deleted' });
  } catch (e) { res.status(500).json({ msg: e.message }); }
});

module.exports = router;