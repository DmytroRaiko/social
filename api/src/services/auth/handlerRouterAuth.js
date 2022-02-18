const UnauthorizedException = require('../errors/UnauthorizedException');
const auth = require('./index');

module.exports = async (req, res) => {
  const { accessToken, refreshToken } = await auth.authById(req.user.profileid);

  if (accessToken) {
    res.send({
      accessToken,
      refreshToken,
      success: true,
    });
  } else {
    throw new UnauthorizedException('');
  }
};
