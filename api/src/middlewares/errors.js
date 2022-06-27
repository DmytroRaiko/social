const NotFoundException = require('../services/errors/NotFoundException');
const UnauthorizedException = require('../services/errors/UnauthorizedException');
const ForbiddenException = require('../services/errors/ForbiddenException');
const BadRequestException = require('../services/errors/BadRequestException');
// eslint-disable-next-line no-unused-vars,consistent-return
module.exports = (err, req, res, next) => {
  if (err instanceof BadRequestException) {
    res.status(400).send({ message: err.message || 'Bad request' });
  } else if (err instanceof UnauthorizedException) {
    res.status(401).send('Unauthorized');
  } else if (err instanceof ForbiddenException) {
    res.status(403).send('Forbidden');
  } else if (err instanceof NotFoundException) {
    res
      .status(404)
      .send({ data: null, success: false, message: err.message });
  } else {
    res.status(500).send('Something went wrong');
  }
};
