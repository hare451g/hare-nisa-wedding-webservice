const Guestbook = require('./model');

const fetchGuestbook = (req, res) => {
  Guestbook.find()
    .sort('-date')
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
  const guestBookEntry = new Guestbook({ name, message, date: new Date() });

  guestBookEntry
    .save()
    .then((document) => {
      const message = `Hello ${document.name} thanks for your wishes!`;

      res.status(201).json({
        message,
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
