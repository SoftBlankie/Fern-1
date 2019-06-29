const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../../database/user');

router.get('/', (req, res) => {
  res.json({
    message: '🔐'
  });
});

function validUser(user) {
  const validEmail = typeof user.email == 'string' &&
    user.email.trim() != '';
  const validPassword = typeof user.password == 'string' &&
    user.password.trim() != '' &&
    user.password.trim().length >= 6;
  return validEmail && validPassword
}

/*router.post('/signup', (req, res) => {
  if (!validUser(req.body)) {
    return res.status(400).json({ msg: 'Invalid user' });
  }

  User
    .getOneByEmail(req.body.email)
    .then(user => {
      console.log('user', user);
      if (user) return res.status(400).json({ msg: 'Email in use' });
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const user = {
            email: req.body.email,
            password: hash,
            date: new Date()
          };
          User
            .create(user)
            .then(id => {
              res.json({
                id,
                msg: '✅'
              });
            });
        });
    });
});*/

router.post('/signup', (req, res, next) => {
if (validUser(req.body)) {
    User
      .getOneByEmail(req.body.email)
      .then(user => {
        console.log('user', user);
        if (!user) {
          bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
              const user = {
                email: req.body.email,
                password: hash,
                date: new Date()
              };
              User
                .create(user)
                .then(id => {
                  res.json({
                    id,
                    message: '✅'
                  });
                });
            });
        } else {
          //return res.status(400).json({ msg: 'Email in use' });
          next(new Error('Email in use'));
        }
      });
  } else {
    //return res.status(400).json({ msg: 'Invalid user' });
    next(new Error('Invalid user'));
  }
});

router.post('/login', (req, res, next) => {
  if (validUser(req.body)) {
    User
      .getOneByEmail(req.body.email)
      .then(user => {
        console.log('user', user);
        if (user) {
          bcrypt
            .compare(req.body.password, user.password)
            .then((result) => {
              if (result) {
                const isSecure = req.app.get('env') != 'development';
                res.cookie('user_id', user.id, {
                  httpOnly: true,
                  secure: isSecure,
                  signed: true
                });
                res.json({
                  id: user.id,
                  message: 'Loggin in! 🔓'
                });
              } else {
                next(new Error('Invalid login'));
              }
            });
        } else {
          next(new Error('Invalid login'));
        }
      });
  } else {
    next(new Error('Invalid login'));
  }
});

router.get('/user', (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
