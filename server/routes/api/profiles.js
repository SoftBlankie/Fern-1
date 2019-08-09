const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../database/profile');

// @route   GET api/profiles
// @desc    Get all Profiles
// @access  Public
router.get('/', (req, res) => {
  Profile.getAll()
    .then(profile => res.json(profile));
});

// @route   GET api/profiles/:id
// @desc    Get specific Profile
// @access  Public
router.get('/:id', (req, res) => {
  Profile.getOne(req.params.id)
    .then(profile => res.json(posts));
});

// @route   POST api/profiles
// @desc    Create a Profile
// @access  Private
router.post('/', auth, (req, res) => {
  const newProfile = {
    user_id: req.body.user_id,
    followers: 0,
    followings: 0
  };
  Profile.create(newProfile).then(profile => res.json(profile));
});

// @route   POST api/profiles/:id
// @desc    Update a Profile
// @access  Private
router.post('/:id', auth, (req, res) => {
  const newProfile = {
    age: req.body.age,
    location: req.body.location,
    learning: req.body.learning,
    native: req.body.native,
    followers: req.body.followers,
    followings: req.body.followings
  };
  Profile.update(req.params.id, newProfile).then(profile => res.json(profile));
});

module.exports = router;
