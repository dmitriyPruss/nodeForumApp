const Message = require('./../models/message');
const msgActionArchiveMw = require('../actions/msgActionArchiveMw');

module.exports.getMessages = (req, res) => {
  const messages = Message.getMessages();

  msgActionArchiveMw.addMsgs(req, messages);
  res.status(200).send(messages);
};

module.exports.createMessage = (req, res) => {
  const createdMessage = Message.createMessage(req.body);

  !req.body
    ? res.status(400).send('We are in trouble, my friend... Error!')
    : (msgActionArchiveMw.addMsgs(req, createdMessage),
      res.status(201).send(createdMessage));
};

module.exports.updateMessage = (req, res) => {
  const {
    params: { msgId }
  } = req;

  const updatedMsg = Message.updateMessage(req.body, msgId);

  updatedMsg && req.body
    ? (msgActionArchiveMw.changeMsg(req, updatedMsg),
      res.status(201).send(updatedMsg))
    : res.status(404).send('Error 404. Updated element not found');
};

module.exports.deleteMessage = (req, res) => {
  const {
    params: { msgId }
  } = req;

  const deletedMsg = Message.deleteMessage(msgId);

  deletedMsg
    ? (msgActionArchiveMw.changeMsg(req, deletedMsg),
      res.status(200).send(deletedMsg))
    : res.status(404).send('Error 404. Not found');
};
