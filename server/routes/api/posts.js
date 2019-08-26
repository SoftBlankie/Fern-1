const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Post = require('../../database/post');

// @route   GET api/posts
// @desc    Get all posts
// @access  public
router.get('/', (req, res) => {
  Post.getJoinUser()
    .orderBy('date', 'desc')
    .then(posts => res.json(posts));
});

// @route   GET api/posts/user
// @desc    Get all Posts from User
// @access  Public
router.post('/user', (req, res) => {
  Post.getJoinUser()
    .where('name', req.body.name)
    .orderBy('date', 'desc')
    .then(posts => res.json(posts));
});

// @route   POST api/posts/followings
// @desc    Get all Posts from Followings
// @access  Public
router.post('/followings', (req, res) => {
  Post.getJoinUser()
    .whereIn('name', req.body.followings)
    .orderBy('date', 'desc')
    .then(posts => res.json(posts));
});

// @route   GET api/posts/:language
// @desc    Get all Posts of Language
// @access  Public
router.get('/:language', (req, res) => {
  Post.getJoinUser()
    .where('language', req.params.language)
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
    date: new Date()
  };
  Post.create(newPost).then(post => res.json(post));
});

// @route   POST api/posts/:id
// @desc    Update a Post
// @access  Private
router.post('/:id', auth, (req, res) => {
  var newPost;
  if (req.body.date) {
    newPost = {
      title: req.body.title,
      entry: req.body.entry,
      language: req.body.language,
      comments: req.body.comments,
      edits: req.body.edits
    };
  } else {
    newPost = {
      title: req.body.title,
      entry: req.body.entry,
      language: req.body.language,
      comments: req.body.comments,
      edits: req.body.edits,
      date: new Date()
    };
  }
  Post.update(req.params.id, newPost).then(post => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Delete a Post
// @access  Private
router.delete('/:id', (req, res) => {
  Post.remove(req.params.id)
    .then(() => res.json({success: true}))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
