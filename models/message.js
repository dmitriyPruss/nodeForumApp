const msgDb = require('./messagesDb');
const { v4: uuidv4 } = require('uuid');

class Message {
  static messages = msgDb;

  static getMessages = () => Message.messages;

  static createMessage = data => {
    const newMsg = { ...data, id: uuidv4() };
    Message.messages.push(newMsg);

    return newMsg;
  };

  static findMsg = msgId => Message.messages.findIndex(msg => msg.id === msgId);

  static updateMessage = (body, msgId) => {
    const updatedMsgIndex = Message.findMsg(msgId);

    if (updatedMsgIndex !== -1) {
      const updatedMsg = { id: msgId, ...body };

      Message.messages.splice(updatedMsgIndex, 1, updatedMsg);

      return updatedMsg;
    } else {
      return null;
    }
  };

  static deleteMessage = msgId => {
    const deletedMsgIndex = Message.findMsg(msgId);

    return deletedMsgIndex !== -1
      ? Message.messages.splice(deletedMsgIndex, 1)[0]
      : null;
  };
}

module.exports = Message;
