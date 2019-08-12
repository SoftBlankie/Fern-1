const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../database/user');
const Profile = require('../../database/profile');

// @route   GET /api/users
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
  User
    .getAll()
    .select('id', 'name', 'email', 'date', 'is_active')
    .then(user => res.json(user));
});

// @route   GET /api/users/:name
// @desc    Get specific user
// @access  Public
router.get('/:name', (req, res) => {
  User
    .getOneByName(req.params.name)
    .select('id', 'name', 'email', 'date', 'is_active')
    .then(user => res.json(user));
});

// @route   POST /api/users
// @desc    Create a user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if(!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Name regex
  const reName = /^[a-zA-Z0-9]*$/;
  if (!reName.test(name)) return res.status(400).json({ msg: 'Invalid name' });

  // Email regex
  const reEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!reEmail.test(email)) return res.status(400).json({ msg: 'Invalid email' });

  // Check for existing user
  User.getOneByEmail(email)
    .then(user => {
      if (user) return res.status(400).json({ msg: 'Email already exists' });
  
      // Name validation
      User.getOneByName(name)
        .then(user => {
          if (user) return res.status(400).json({ msg: 'Name already exists' });

          const newUser = {
            name,
            email,
            password,
            date: new Date()
          };

          // Create salt & hash
          bcrypt
            .hash(password, 10)
            .then((hash) => {
              newUser.name = req.body.name;
              newUser.email = req.body.email;
              newUser.password = hash;

              // Create user
              User.create(newUser).then(newId => {
                jwt.sign(
                  { id: newId },
                  config.get('jwtSecret'),
                  { expiresIn: 3600 },
                  (err, token) => {
                  if(err) throw err;
                    res.json({
                      token,
                      user: {
                        id: newId,
                        name: newUser.name,
                        email: newUser.email
                      }
                    });
                  }
                )

                const newProfile = {
                  user_id: newId,
                  followings: [],
                  followers: []
                };

                // Create profile
                Profile.create(newProfile);
              });
            });
        })
    })
});

module.exports = router;
