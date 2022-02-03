module.exports = (params) => (req, res, next) => {
  const { db, logTable } = params;
  db(logTable)
    .insert({
      method: req.method,
      path: req.url,
    })
    .then(() => next());
};
