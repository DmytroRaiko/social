const router = require('express').Router();
const passport = require('passport');
const middleAsync = require('../middlewares/async');
const authControllers = require('../controllers/auth');
const auth = require('../middlewares/auth');
const bodyValidation = require('../middlewares/bodyValidation');
const profileServices = require('../services/store/profiles.services');
const {
  login, forgotPassword, registration, resetPassword
} = require('../services/validation/auth.validation');

router.get(
  '/user-by-cookie',
  auth,
  middleAsync(async (req, res) => authControllers.getOneUser(req, res))
);

router.post(
  '/registration',
  bodyValidation(registration, {
    email: { unique: (req) => profileServices.isUniqueEmail(req?.body?.email), }
  }),
  middleAsync(async (req, res) => authControllers.registration(req, res))
);

router.post(
  '/login',
  bodyValidation(login, {}),
  middleAsync(async (req, res) => authControllers.login(req, res))
);

router.post(
  '/forgot-password',
  bodyValidation(forgotPassword, {}),
  middleAsync(async (req, res) => authControllers.forgotPassword(req, res))
);

router.post(
  '/reset-password/:hash',
  bodyValidation(resetPassword, {}),
  middleAsync(async (req, res) => authControllers.resetPassword(req, res))
);

router.post(
  '/refresh',
  middleAsync(async (req, res) => authControllers.refresh(req, res))
);

router.get(
  '/activate/:hash',
  middleAsync(async (req, res) => authControllers.activate(req, res))
);

router.post(
  '/logout',
  middleAsync(async (req, res) => authControllers.logout(req, res))
);

router.post(
  '/google',
  passport.authenticate('google-token', { session: true }),
  middleAsync(async (req, res) => authControllers.google(req, res))
);

router.post(
  '/facebook',
  passport.authenticate('facebook-token', { session: true }),
  middleAsync(async (req, res) => authControllers.facebook(req, res))
);

module.exports = router;
