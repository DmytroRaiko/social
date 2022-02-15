const multer = require('multer');
const fs = require('fs');
const mimetype = require('./mimetypeArray');
const filter = require('./fileFilter');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `images/${req.params.profileid}/`;

    fs.stat('images/', (errorImages) => {
      if (errorImages) {
        fs.mkdirSync('images/');
      }
      fs.stat(path, (errorPath) => {
        if (errorPath) {
          fs.mkdirSync(path);
        }
        cb(null, path);
      });
    });
  },
  filename: (req, file, cb) => {
    cb(null, `avatar${mimetype[file.mimetype]}`);
  },
});

const fileFilter = filter;

const upload = multer({ storage, fileFilter });

module.exports = upload;
