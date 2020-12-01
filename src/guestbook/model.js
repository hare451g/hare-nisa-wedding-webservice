const database = require('mongoose');

const Guestbook = database.model(
  'Guestbook',
  database.Schema({
    name: String,
    message: String,
  })
);

module.exports = Guestbook;
