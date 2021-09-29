const { v4: uuidv4 } = require('uuid');
const format = require('date-fns/format');

const msgsDb = [
  {
    id: uuidv4(),
    text: 'Hi!',
    eMail: 'fomaKret@gmail.com',
    timeValue: format(new Date(2012, 12, 1), 'MM.dd.yyyy')
  },
  {
    id: uuidv4(),
    text: 'I am Jane',
    eMail: 'grishaGogin@gmail.com.ua',
    timeValue: format(new Date(2012, 3, 22), 'MM.dd.yyyy')
  }
];

module.exports = msgsDb;
