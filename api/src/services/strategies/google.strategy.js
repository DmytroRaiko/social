const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const config = require('../config');
const authServices = require('../store/auth.services');
const profilesServices = require('../store/profiles.services');

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: config.auth.google.googleID,
      clientSecret: config.auth.google.googleSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await authServices.google.selectProfileByTokenId(profile.id);

      if (!user) {
        const [{ value: email }] = profile.emails;

        await profilesServices.addProfile({
          name: profile.displayName,
          email,
          googleid: profile.id,
        });

        user = await authServices.google.selectProfileByTokenId(profile.id);
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
