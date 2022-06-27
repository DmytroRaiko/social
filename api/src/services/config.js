module.exports = {
  appPort: process.env.APP_PORT,
  accessTokenKey: process.env.KEY_ACCESS_TOKEN,
  refreshTokenKey: process.env.KEY_REFRESH_TOKEN,
  clientUrl: process.env.CLIENT_URL,
  apiUrl: process.env.API_URL,
  database: {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbPass: process.env.DB_PASS,
    dbUser: process.env.DB_USER,
    db: process.env.DATABASE,
  },
  auth: {
    expiresInAccessToken: '30m', // 30 minutes
    expiresInRefreshToken: '30d', // 30 days
    lifeTimeRefreshToken: 7 * 24 * 60 * 60 * 1000, // 7 days
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
