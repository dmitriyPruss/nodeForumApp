const express = require('express');
const app = express();

const msgController = require('./controllers/msgController');

const validateMw = require('./middleware/validateMw');
const parseDateMw = require('./middleware/parseDateMw');
const formatDateMw = require('./middleware/formatDateMw');

app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Error 505! ${err}`);
});

// C
app.post(
  '/messages',
  parseDateMw.parseDate,
  validateMw.validateMsg,
  formatDateMw.formatDate,
  msgController.createMessage
);

// R
app.get('/messages', msgController.getMessages);

// U
app.patch(
  '/messages/:msgId',
  parseDateMw.parseDate,
  validateMw.validateMsg,
  formatDateMw.formatDate,
  msgController.updateMessage
);

// D
app.delete('/messages/:msgId', msgController.deleteMessage);

module.exports = app;
