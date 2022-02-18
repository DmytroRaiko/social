const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('../config');
const authServices = require('../store/auth.services');
const profilesServices = require('../store/profiles.services');

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: config.auth.facebook.facebookID,
      clientSecret: config.auth.facebook.facebookSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await authServices.facebook.selectProfileByTokenId(profile.id);

      if (!user) {
        await profilesServices.addProfile({
          name: profile.displayName,
          facebookid: profile.id,
        });

        user = await authServices.facebook.selectProfileByTokenId(profile.id);
      }

      done(null, {
        profileid: user.profileid,
        name: user.name,
        email: user.email,
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
