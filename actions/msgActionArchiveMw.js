const fs = require('fs');
const path = require('path');

const { dir } = path.parse(__dirname);
const filePath = `${dir}/msgReport/msg_report.txt`;

module.exports.addMsgs = (req, data) => {
  const timeStamp = new Date();
  let reportData = '';

  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      reportData += `
        TimeStamp: ${timeStamp}\n
        id: ${data[i].id}\n 
        text: ${data[i].text}\n 
        eMail: ${data[i].eMail}\n
        timeValue: ${data[i].timeValue}\n  
        Request METHOD: ${req.method}\n`;
    }
    reportData += '\n';
  } else {
    reportData = `
      TimeStamp: ${timeStamp}\n
      id: ${data.id}\n 
      text: ${data.text}\n 
      eMail: ${data.eMail}\n
      timeValue: ${data.timeValue}\n  
      Request METHOD: ${req.method}\n\n`;
  }

  fs.readdir(`${dir}//msgReport`, (err, files) => {
    if (err) throw err;

    if (files.length) {
      files.forEach(file => {
        if (file === 'msg_report.txt') {
          fs.appendFile(filePath, reportData, err => {
            if (err) throw err;
          });
        }
      });
    } else {
      fs.writeFile(filePath, reportData, err => {
        if (err) throw err;
      });
    }
  });
};

module.exports.changeMsg = (req, changedMsg) => {
  const timeStamp = new Date();

  const reportData = `
    TimeStamp: ${timeStamp}\n 
    id: ${changedMsg.id}\n
    text: ${changedMsg.text}\n
    eMail: ${changedMsg.eMail}\n
    timeValue: ${changedMsg.timeValue}\n  
    Request METHOD: ${req.method}\n\n`;

  fs.appendFile(filePath, reportData, err => {
    if (err) throw err;
  });
};
