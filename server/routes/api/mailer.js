const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('config');

const transporter = nodemailer.createTransport({
  service: config.get('mailService'),
  auth: {
    user: config.get('mailUser'),
    pass: config.get('mailPass'),
  },
});

// @route   POST api/mailer
// @desc    Post Mail
// @access  Public
router.post('/', (req, res) => {
  const mailOptions = {
    from: 'Fern <' + config.get('mailUser') + '>',
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
