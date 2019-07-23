const express = require('expresss');
const router = express.Router();
const auth = require('../../middleware/auth');

const Comment = require('../../database/comment');

// @route   GET api/posts/:id/comments
// @desc    Get all post comments
// @access  Public

// @route   POST api/posts/:id/comments
// @desc    Create a Comment
// @access  Private

// @route   POST api/posts/:id/comments/:id
// @desc    Update a Comment
// @access  Private

// @route   DELETE api/posts/:id/comments/:id
// @desc    Delete a Comment
// @access  Private

module.exports = router;
