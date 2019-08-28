const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Edit = require('../../database/edit');

// @route   GET api/posts/:id/edits
// @desc    Get all post Edits
// @access  Public
router.get('/:id/edits', (req, res) => {
  Edit.getJoinUser()
    .where('post_id', req.params.id)
    .orderBy('date', 'desc')
    .then(edits => res.json(edits));
});

// @route   POST api/posts/:id/edits
// @desc    Create an Edit
// @access  Private
router.post('/:id/edits', auth, (req, res) => {
  const newEdit = {
    user_id: req.body.user_id,
    post_id: req.params.id,
    selection: req.body.selection,
    edit: req.body.edit,
    agrees: [],
    reports: [],
    date: new Date()
  };
  Edit.create(newEdit).then(edit => res.json(edit))
});

// @route   POST api/posts/:post_id/edits/:edit_id
// @desc    Update an Edit
// @access  Private
router.post('/:post_id/edits/:edit_id', auth, (req, res) => {
  var newEdit;
  if (req.body.date) {
    newEdit = {
      edit: req.body.edit,
      agrees: req.body.agrees,
      reports: req.body.reports
    };
  } else {
    newEdit = {
      edit: req.body.edit,
      agrees: req.body.agrees,
      reports: req.body.reports,
      date: new Date()
    };
  }
  Edit.update(req.params.edit_id, newEdit).then(edit => res.json(edit));
});

// @route   DELETE api/posts/:post_id/edits/:edit_id
// @desc    Delete an Edit
// @access  Private
router.delete('/:post_id/edits/:edit_id', auth, (req, res) => {
  Edit.remove(req.params.edit_id)
    .then(() => res.json({success: true}))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
