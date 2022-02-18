const jwt = require('jsonwebtoken');
const { v4: uuidV4 } = require('uuid');
const config = require('../config');
const authService = require('../store/auth.services');
const profilesService = require('../store/profiles.services');

module.exports = {
  refresh: async (refreshToken) => {
    const session = await authService.getSessionByToken(refreshToken);
    if (session) {
      const accessToken = jwt.sign(
        { profileid: session.profileid },
        config.auth.secretKey
      );
      const newRefreshToken = uuidV4();
      await authService.deleteSessionByToken(session.accesstoken);
      await authService.addSession({
        profileid: session.profileid,
        accesstoken: newRefreshToken,
      });

      return { accessToken, newRefreshToken };
    }

    return {};
  },
  logout: async (token) => {
    await authService.deleteSessionByToken(token);
  },
  authById: async (id) => {
    const user = await profilesService.getProfileByIdAuth(id);

    console.log(user);
    if (user) {
      const accessToken = jwt.sign(
        { profileid: user.profileid },
        config.auth.secretKey
      );
      const refreshToken = uuidV4();
      await authService.addSession({
        profileid: user.profileid,
        accesstoken: refreshToken,
      });

      return { accessToken, refreshToken };
    }

    return {};
  },
};
