const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');
const middleAsync = require('../middlewares/async');
const UnauthorizedException = require('../services/errors/UnauthorizedException');
const handlerRouterAuth = require('../services/auth/handlerRouterAuth');

router.post(
  '/refresh',
  middleAsync(async (req, res) => {
    const { accessToken, refreshToken } = await auth.refresh(
      req.body.refreshToken
    );
    if (accessToken) {
      res.send({
        accessToken,
        refreshToken,
        success: true,
      });
    } else {
      throw new UnauthorizedException('');
    }
  })
);

router.post(
  '/logout',
  middleAsync(async (req, res) => {
    await auth.logout(req.body.refreshToken);
    return res.send({
      success: true,
    });
  })
);

router.post(
  '/google',
  passport.authenticate('google-token', { session: false }),
  middleAsync(async (req, res) => {
    const resultHandleRouter = await handlerRouterAuth(req.user.profileid);

    if (resultHandleRouter) {
      res.send(resultHandleRouter);
    } else {
      throw new UnauthorizedException('');
    }
  })
);

router.post(
  '/facebook',
  passport.authenticate('facebook-token'),
  middleAsync(async (req, res) => {
    const resultHandleRouter = await handlerRouterAuth(req.user.profileid);

    if (resultHandleRouter) {
      res.send(resultHandleRouter);
    } else {
      throw new UnauthorizedException('');
    }
  })
);

module.exports = router;
