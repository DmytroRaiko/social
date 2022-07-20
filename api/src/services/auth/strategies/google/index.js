const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const config = require('../../../config');
const authServices = require('../../../store/auth.services');
const profilesServices = require('../../../store/profiles.services');

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: config.auth.google.googleID,
      clientSecret: config.auth.google.googleSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await authServices.google.selectProfileByGoogleTokenId(
        profile.id,
        // eslint-disable-next-line no-underscore-dangle
        profile._json.email,
      );
      if (!user) {
        const [{ value: email }] = profile.emails;

        await profilesServices.addProfile({
          name: profile.displayName,
          email,
          googleId: profile.id,
        });

        user = await authServices.google.selectProfileByGoogleTokenId(profile.id);
      } else {
        await profilesServices.updateProfile({ googleId: profile.id }, user.profileId);
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
