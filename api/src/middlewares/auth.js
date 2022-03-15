const jwt = require('jsonwebtoken');
const UnauthorizedException = require('../services/errors/UnauthorizedException');
const config = require('../services/config');

module.exports = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    let decoded;
    try {
      decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, config.secretKey, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      });
    } catch (e) {
      // do nothing
    }
    if (decoded) {
      req.session = decoded;
      next();
    } else {
      next(new UnauthorizedException(''));
    }
  } else {
    next(new UnauthorizedException(''));
  }
};
