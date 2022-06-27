const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
  generateToken: (payload) => {
    const newAccessToken = jwt.sign(payload, config.accessTokenKey, {
      expiresIn: config.auth.expiresInAccessToken,
    });

    const newRefreshToken = jwt.sign(payload, config.refreshTokenKey, {
      expiresIn: config.auth.expiresInRefreshToken,
    });
    return { newAccessToken, newRefreshToken };
  },

  validateToken: (token) => {
    try {
      return jwt.verify(token, config.refreshTokenKey);
    } catch (e) {
      return null;
    }
  }
};
