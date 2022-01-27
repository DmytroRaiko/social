const multer = require('multer');
const fs = require('fs');
const mimetype = require('./mimetypeArray');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `avatars/${req.params.profileid}/`;

    fs.stat('avatars/', (err) => {
      if (err) {
        fs.mkdirSync('avatars/');
      }
      fs.stat(path, (error) => {
        if (error) {
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

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype &&
    (file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg')
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
