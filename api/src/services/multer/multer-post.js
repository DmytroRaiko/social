const multer = require('multer');
const fs = require('fs');
const mimetype = require('./mimetypeArray');
const filter = require('./fileFilter');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { profileid } = req;

    const path = `posts/${profileid}/`;

    fs.stat('posts/', (err) => {
      if (err) {
        fs.mkdirSync('posts/');
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
    console.log(file);
    cb(null, `${file.fieldname}-${Date.now()}${mimetype[file.mimetype]}`);
  },
});

const fileFilter = filter;

const upload = multer({ storage, fileFilter });

module.exports = upload;
