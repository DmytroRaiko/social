const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const authService = require('../store/auth.services');
const profilesService = require('../store/profiles.services');
const tokenService = require('./token.services');
const BadRequestException = require('../errors/BadRequestException');
const UnauthorizedException = require('../errors/UnauthorizedException');
const { transporter } = require('../mail-service');
const config = require('../config');
const profileServices = require('../store/profiles.services');

module.exports = {
  registration: async (name, email, password) => {
    const hashPassword = await bcrypt.hash(password, 3);
    const activateLink = uuid.v4();

    const createProfile = await profilesService.addProfile({
      email, password: hashPassword, activateLink, name,
    });

    if (!createProfile[0]?.profileId) {
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

    if (!loginData?.profileId || !passwordsIsEquals) {
      throw new BadRequestException('Invalid password');
    }

    const tokens = tokenService.generateToken(loginData);

    await authService.addSession({
      profileId: loginData.profileId,
      accessToken: tokens.newRefreshToken,
    });

    return { ...tokens, user: loginData };
  },

  forgotPassword: async (email) => {
    const profile = await profileServices.getProfileByEmail(email);

    if (profile?.profileId) {
      const link = `${config.clientUrl}/reset-password/${profile?.activateLink}`;

      transporter.sendMail({
        from: 'rajkodima@gmail.com',
        to: email,
        subject: 'Password resetting',
        text: 'Reset password to your account',
        html: `Click <a href=${link}>here</a> to reset your password.`,
      });

      return 1;
    }

    return 0;
  },

  refresh: async (refreshToken) => {
    const session = await authService.getSessionByToken(refreshToken);

    if (!session) {
      return null;
    }
    const validate = tokenService.validateToken(refreshToken);

    const userData = await authService.getUserById(session.profileId);
    if (!validate || !userData) {
      throw new UnauthorizedException();
    }

    const tokens = tokenService.generateToken(userData);

    await authService.deleteSessionByToken(session.accessToken);
    await authService.addSession({
      profileId: session.profileId,
      accessToken: tokens.newRefreshToken,
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
        profileId: user.profileId,
      });

      await authService.addSession({
        profileId: user.profileId,
        accessToken: tokens.newRefreshToken,
      });

      return { ...tokens, user };
    }

    return null;
  },

  resetPassword: async (hash, password) => {
    const hashPassword = await bcrypt.hash(password, 3);

    // eslint-disable-next-line no-return-await
    return await authService.resetPassword(hash, hashPassword);
  },
};
