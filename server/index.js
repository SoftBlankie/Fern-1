const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./database');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/mailer', require('./routes/api/mailer'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/posts', require('./routes/api/edits'));
app.use('/api/posts', require('./routes/api/comments'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profiles', require('./routes/api/profiles'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

db.query('SELECT NOW()', (err, res) => {
  if (err.error)
    return console.log(err.error);
  console.log(`PostgreSQL connected: ${res[0].now}.`);
});

module.exports = app;
