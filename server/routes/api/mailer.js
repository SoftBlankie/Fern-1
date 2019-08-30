const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// @route   POST api/mailer
// @desc    Post Mail
// @access  Public
router.post('/', (req, res) => {
  const mailOptions = {
    from: 'Fern <' + process.env.MAIL_USER + '>',
    subject: 'Fern Support',
    text:
    "This is a copy of your message sent to Fern's support manager.\n"
    + "----------------------------------------\n\n" 
    + req.body.message,
  };

  const options = { ...mailOptions, to: req.body.email };
  transporter.sendMail(options, (err, info) => {
    if (err) {
      res.json(err);
    } else {
      res.json('success');
    }
  });
});

module.exports = router;
