const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const config = require('../config');
const db = require('../db');

module.exports = () => {
  const registerStrategy = () => {
    passport.use(
      new GoogleTokenStrategy(
        {
          clientID: config.googleID,
          clientSecret: config.googleSecret,
        },
        //  Passport verify callback
        async (accessToken, refreshToken, profile, done) => {
          let user = await db
            .select()
            .first()
            .from('profile')
            .where('googleid', '=', profile.id);
          if (!user) {
            const [{ value: email }] = profile.emails;

            await db('profile').insert({
              name: profile.displayName,
              email,
              googleid: profile.id,
            });
            user = await db
              .select()
              .first()
              .from('profile')
              .where('googleid', '=', profile.id);
          }

          done(null, {
            profileid: user.profileid,
            name: user.name,
            email: user.email,
          });
        }
      )
    );
  };
  return { registerStrategy, passport };
};

// passport.serializeUser((user, done) => {
//   done(null, user);
// });
//
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
