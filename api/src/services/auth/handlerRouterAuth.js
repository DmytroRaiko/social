const auth = require('./index');

module.exports = async (profilleId) => {
  const { accessToken, refreshToken } = await auth.authById(profilleId);

  if (accessToken) {
    return {
      accessToken,
      refreshToken,
      success: true,
    };
  }
  return 0;
};
