const auth = require('./index');

module.exports = async (profileId) => {
  const authentication = await auth.authById(
    profileId
  );

  if (authentication.newAccessToken) {
    return authentication;
  }
  return 0;
};
