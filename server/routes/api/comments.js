const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Comment = require('../../database/comment');

// @route   GET api/posts/:id/comments
// @desc    Get all post comments
// @access  Public
router.get('/:id/comments', (req, res) => {
  Comment.getAllByPost(req.params.id)
    .orderBy('date', 'desc')
    .then(comments => res.json(comments));
});

// @route   POST api/posts/:id/comments
// @desc    Create a Comment
// @access  Private
router.post('/:id/comments', auth, (req, res) => {
  const newComment = {
    user_id: req.body.user_id,
    post_id: req.params.id,
    comment: req.body.comment,
    date: new Date()
  };
  Comment.create(newComment).then(comment => res.json(comment));
});

// @route   POST api/posts/:post_id/comments/:comment_id
// @desc    Update a Comment
// @access  Private
router.post('/:post_id/comments/:comment_id', auth, (req, res) => {
  const newComment = {
    comment: req.body.comment,
    date: new Date()
  };
  Comment.update(req.params.comment_id, newComment).then(comment => res.json(comment));
});

// @route   DELETE api/posts/:post_id/comments/:comment_id
// @desc    Delete a Comment
// @access  Private
router.delete('/:post_id/comments/:comment_id', auth, (req, res) => {
  Comment.remove(req.params.comment_id)
    .then(() => res.json({success: true}))
    .catch(err => res.status(404).json({success: false}));
}); 

module.exports = router;
