const NotFoundException = require('../services/errors/NotFoundException');
const UnauthorizedException = require('../services/errors/UnauthorizedException');
const ForbiddenException = require('../services/errors/ForbiddenException');
// eslint-disable-next-line no-unused-vars,consistent-return
module.exports = (err, req, res, next) => {
  if (err instanceof UnauthorizedException) {
    res.status(401).send('Unauthorized');
  } else if (err instanceof ForbiddenException) {
    res.status(403).send('Forbidden');
  } else if (err instanceof NotFoundException) {
    res
      .status(404)
      .send({ data: null, success: false, errorMessage: err.message });
  } else {
    res.status(500).send('Something went wrong');
  }
};
