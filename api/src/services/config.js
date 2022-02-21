module.exports = {
  appPort: process.env.APP_PORT,
  secretKey: process.env.KEY_TOKEN,
  database: {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbPass: process.env.DB_PASS,
    dbUser: process.env.DB_USER,
    db: process.env.DATABASE,
  },
  auth: {
    expiresTime: '30m',
    google: {
      googleID: process.env.GOOGLE_ID,
      googleSecret: process.env.GOOGLE_SECRET,
    },
    facebook: {
      facebookID: process.env.FACEBOOK_ID,
      facebookSecret: process.env.FACEBOOK_SECRET,
    },
  },
};
