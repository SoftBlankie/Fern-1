const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../database/user');

router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if(!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.getOneByEmail({ email })
    .then(user => {
      if(user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = {
        name,
        email,
        password
      };

      // Create salt & hash
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          newUser.name = req.body.name;
          newUser.email = req.body.email;
          newUser.password = hash;

          jwt.sign(
            { id: newUser.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
            if(err) throw err;
              res.json({
                token,
                user: {
                  id: newUser.id,
                  name: newUser.name,
                  email: newUser.email
                }
              });
            }
          )
        });
    })
});

module.exports = router;
