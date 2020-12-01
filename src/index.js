const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

// local modules
const {
  fetchGuestbook,
  postGuestbook,
  removeGuestbook,
} = require('./guestbook/service');
const { connectionString } = require('./database');

// Database
const database = mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', () => {
  // we're connected!
  const webservice = express();

  // middlewares
  webservice.use(bodyParser.json());
  webservice.use(cors('*'));

  // setup port 🔌
  const port = process.env.PORT || 5000;

  // services 📦
  webservice.get('/', fetchGuestbook);
  webservice.post('/', postGuestbook);
  webservice.delete('/:id', removeGuestbook);

  // listen to requests 👂
  webservice.listen(port, () => {
    console.log(`🚀 Webservice running on ${port}`);
  });
});
