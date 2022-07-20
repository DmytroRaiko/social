const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('../../../config');
const authServices = require('../../../store/auth.services');
const profilesServices = require('../../../store/profiles.services');

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: config.auth.facebook.facebookID,
      clientSecret: config.auth.facebook.facebookSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await authServices.facebook.selectProfileByFacebookTokenId(
        profile.id
      );

      if (!user) {
        await profilesServices.addProfile({
          name: profile.displayName,
          facebookId: profile.id,
        });

        user = await authServices.facebook.selectProfileByFacebookTokenId(profile.id);
      }

      done(null, {
        profileId: user.profileId,
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
