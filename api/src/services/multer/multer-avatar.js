const multer = require('multer');
const fs = require('fs');
const mimetype = require('./mimetypeArray');
const filter = require('./fileFilter');

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

const fileFilter = filter;

const upload = multer({ storage, fileFilter });

module.exports = upload;
