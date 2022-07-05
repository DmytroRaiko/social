const router = require('express').Router();
const passport = require('passport');
const middleAsync = require('../middlewares/async');
const authControllers = require('../controllers/auth');
const auth = require('../middlewares/auth');

router.get(
  '/user-by-cookie',
  auth,
  middleAsync(async (req, res) => authControllers.getOneUser(req, res))
);

router.post(
  '/registration',
  middleAsync(async (req, res) => authControllers.registration(req, res))
);

router.post(
  '/login',
  middleAsync(async (req, res) => authControllers.login(req, res))
);

router.post(
  '/forgot-password',
  middleAsync(async (req, res) => authControllers.forgotPassword(req, res))
);

router.post(
  '/reset-password/:hash',
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
