module.exports = (req, file, cb) => {
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
