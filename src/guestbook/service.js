const Guestbook = require('./model');

const fetchGuestbook = (req, res) => {
  Guestbook.find()
    .then((document) => {
      if (!document || document.length <= 0) {
        res.status(200).json({
          message: 'Guestbook is empty',
          data: [],
        });
        return;
      }

      res.status(200).json({
        data: document,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
      });
    });
};

const postGuestbook = (req, res) => {
  const { message, name } = req.body;
  const guestBookEntry = new Guestbook({ name, message });

  guestBookEntry
    .save()
    .then((document) => {
      res.status(201).json({
        message: 'Created new guestbook entry',
        data: document,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
      });
    });
};

const removeGuestbook = (req, res) => {
  const { id } = req.params;
  Guestbook.findByIdAndRemove(id)
    .then((document) => {
      if (!document || document.length <= 0) {
        res.status(200).json({
          message: `Guestbook ${id} is not found`,
          data: [],
        });
        return;
      }

      res.status(200).json({
        data: document,
        message: `successfully deleted ${id}`,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
      });
    });
};

module.exports = {
  fetchGuestbook,
  postGuestbook,
  removeGuestbook,
};