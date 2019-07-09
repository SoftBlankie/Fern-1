const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Post = require('../../database/post');

// @route   get api/posts
// @desc    get all posts
// @access  public
router.get('/', (req, res) => {
  Post.getAll()
    .orderBy('date', 'desc')
    .then(posts => res.json(posts));
});

// @route   get api/posts/user
// @desc    get all posts/user
// @access  public
router.post('/user', (req, res) => {
  Post.getAll()
    .where('user_id', req.body.user_id)
    .orderBy('date', 'desc')
    .then(posts => res.json(posts));
});

// @route   POST api/posts
// @desc    Create a Post
// @access  Private
router.post('/', auth, (req, res) => {
  const newPost = {
    user_id: req.body.user_id,
    title: req.body.title,
    entry: req.body.entry,
    language: req.body.language,
    comments: 0,
    edits: 0,
    date: new Date()
  };
  Post.create(newPost).then(post => res.json(post));
});

// @route   DELETE api/items:id
// @desc    Delete a Post
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Post.remove(req.params.id)
    .then(() => res.json({success: true}))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
