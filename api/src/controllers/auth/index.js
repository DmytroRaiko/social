const auth = require('../../services/auth');
const authServices = require('../../services/store/auth.services');
const profileServices = require('../../services/store/profiles.services');
const UnauthorizedException = require('../../services/errors/UnauthorizedException');
const handlerRouterAuth = require('../../services/auth/handlerRouterAuth');
const BadRequestException = require('../../services/errors/BadRequestException');
const config = require('../../services/config');

module.exports = {
  getOneUser: async (req, res) => {
    const { profileid } = req.session;

    if (!profileid) {
      throw new UnauthorizedException();
    }

    const user = await authServices.getUserById(profileid);

    if (!user) {
      throw new BadRequestException('Unknown error');
    }
    res.send({ user });
  },

  registration: async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      throw new BadRequestException('Validation error');
    }

    const isProfile = await profileServices.getProfileByEmail(email);

    if (isProfile?.profileid) {
      throw new BadRequestException('User with this email already exist');
    }

    const registration = await auth.registration(name, email, password);

    if (!registration) {
      throw new Error('Unknown error');
    }

    res.send(registration);
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestException('Validation error');
    }

    const isProfile = await profileServices.getProfileByEmail(email);

    if (!isProfile?.profileid) {
      throw new BadRequestException('User with this email was not found');
    }

    const login = await auth.login(email, password);

    if (!login) {
      throw new Error('Unknown error');
    }

    res.cookie('refreshToken', login?.newRefreshToken, {
      maxAge: config.auth.lifeTimeRefreshToken,
      httpOnly: true
    });

    res.send(login);
  },

  forgotPassword: async (req, res) => {
    const { email } = req.body;

    const forgot = await auth.forgotPassword(email);

    if (!forgot) {
      throw new BadRequestException('Please, register your account!');
    }

    res.send({ message: 'We send mail to your email!' });
  },

  refresh: async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const refresh = await auth.refresh(
      refreshToken
    );

    res.cookie('refreshToken', refresh?.newRefreshToken, {
      maxAge: config.auth.lifeTimeRefreshToken,
      httpOnly: true
    });
    res.send(refresh);
  },

  logout: async (req, res) => {
    const { refreshToken } = req.cookies;
    await auth.logout(refreshToken);

    res.clearCookie('refreshToken');
    res.send({
      success: true,
    });
  },

  activate: async (req, res) => {
    const { hash } = req.params;

    await authServices.activateProfile(hash);

    res.redirect(config.clientUrl);
  },

  resetPassword: async (req, res) => {
    const { hash } = req.params;
    const { password } = req.body;

    const resetPassword = await auth.resetPassword(hash, password);

    if (!resetPassword) {
      throw new Error('Unknown Error');
    }

    res.send();
  },

  facebook: async (req, res) => {
    const resultHandleRouter = await handlerRouterAuth(req.user.profileid);

    if (resultHandleRouter) {
      throw new UnauthorizedException('');
    }

    res.cookie('refreshToken', resultHandleRouter?.newRefreshToken, {
      maxAge: config.auth.lifeTimeRefreshToken,
      httpOnly: true
    });
    res.send(resultHandleRouter);
  },

  google: async (req, res) => {
    const resultHandleRouter = await handlerRouterAuth(req.user.profileid);

    if (!resultHandleRouter) {
      throw new UnauthorizedException('');
    }

    res.cookie('refreshToken', resultHandleRouter?.newRefreshToken, {
      maxAge: config.auth.lifeTimeRefreshToken,
      httpOnly: true,
    });
    res.send(resultHandleRouter);
  },
};
