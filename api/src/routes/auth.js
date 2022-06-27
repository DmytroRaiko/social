const router = require('express').Router();
const passport = require('passport');
const middleAsync = require('../middlewares/async');
const authControllers = require('../controllers/auth');

router.post(
  '/registration',
  middleAsync(async (req, res) => authControllers.registration(req, res))
);

router.post(
  '/login',
  middleAsync(async (req, res) => authControllers.login(req, res))
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
