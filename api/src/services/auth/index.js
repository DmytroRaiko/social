const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const authService = require('../store/auth.services');
const profilesService = require('../store/profiles.services');
const tokenService = require('./token.services');
const BadRequestException = require('../errors/BadRequestException');
const UnauthorizedException = require('../errors/UnauthorizedException');
const { transporter } = require('../mail-service');
const config = require('../config');

module.exports = {
  registration: async (email, password) => {
    const hashPassword = await bcrypt.hash(password, 3);
    const activateLink = uuid.v4();

    const createProfile = await profilesService.addProfile({
      email, password: hashPassword, activateLink, name: 'New profile',
    });

    if (!createProfile?.profileid) {
      throw new BadRequestException('Unknown error');
    }

    const link = `${config.apiUrl}/auth/activate/${activateLink}`;

    transporter.sendMail({
      from: 'rajkodima@gmail.com',
      to: email,
      subject: 'Activation mail',
      text: 'Activate your account',
      html: `Please, activate your account. Click <a href=${link}>here</a> to activate.`,
    });

    return { message: 'Profile created!', success: 1 };
  },

  login: async (email, password) => {
    const loginData = await authService.getUserByEmail(email);

    if (!loginData?.password) {
      throw new BadRequestException('Please authorise via social media');
    }
    const passwordsIsEquals = await bcrypt.compareSync(password, loginData?.password);

    if (!loginData?.profileid || !passwordsIsEquals) {
      throw new BadRequestException('Invalid password');
    }

    const tokens = tokenService.generateToken(loginData);

    await authService.addSession({
      profileid: loginData.profileid,
      accesstoken: tokens.newRefreshToken,
    });

    return { ...tokens, user: loginData };
  },

  refresh: async (refreshToken) => {
    const session = await authService.getSessionByToken(refreshToken);

    if (!session) {
      return null;
    }
    const validate = tokenService.validateToken(refreshToken);

    const userData = await authService.getUserById(session.profileid);
    if (!validate || !userData) {
      throw new UnauthorizedException();
    }

    const tokens = tokenService.generateToken(userData);

    await authService.deleteSessionByToken(session.accesstoken);
    await authService.addSession({
      profileid: session.profileid,
      accesstoken: tokens.newRefreshToken,
    });

    return { ...tokens, user: userData };
  },

  logout: async (token) => {
    await authService.deleteSessionByToken(token);
  },

  authById: async (id) => {
    const user = await profilesService.getProfileById(id);

    if (user) {
      const tokens = tokenService.generateToken({
        profileid: user.profileid,
      });

      await authService.addSession({
        profileid: user.profileid,
        accesstoken: tokens.newRefreshToken,
      });

      return { ...tokens, user };
    }

    return null;
  },
};
