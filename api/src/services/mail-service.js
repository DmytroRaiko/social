const nodemailer = require('nodemailer');

module.exports = {
  transporter: nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rajkodima@gmail.com',
      pass: 'btsodeykfryfncsb',
    },
  }),
};
