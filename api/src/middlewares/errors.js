const NotFoundException = require('../services/errors/NotFoundException');
const UnauthorizedException = require('../services/errors/UnauthorizedException');
// eslint-disable-next-line no-unused-vars,consistent-return
module.exports = (err, req, res, next) => {
  console.log(err);
  if (err instanceof NotFoundException) {
    res
      .status(404)
      .send({ data: null, success: false, errorMessage: err.message });
  }
  if (err instanceof UnauthorizedException) {
    res.status(401).send('Unauthorized');
  } else {
    res.status(500).send('Something went wrong');
  }
};
