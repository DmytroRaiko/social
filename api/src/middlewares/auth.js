module.exports = (req, res, next) => {
  let auth = false;
  if (req.headers && req.headers.cookie) {
    req.headers.cookie.split('; ').forEach((key) => {
      const [cookie, value] = key.split('=');
      if (cookie === 'profileid') {
        auth = true;
        req.profileid = +value;
      }
    });
  }
  if (!auth) {
    res.status(401).send('Unauthorized');
  }
  next();
};
