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

  // Email validation
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) return res.status(400).json({ msg: 'Invalid email' });

  // Check for existing user
  User.getOneByEmail(email)
    .then(user => {
      if (user) return res.status(400).json({ msg: 'User already exists' });

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
          });
        });
    })
});

module.exports = router;
