module.exports = {
  URI: 'http://localhost:9000',
  availability: { value: 1, label: 'All' }, // default availability, mean "available for all"
  postAvailabilityStyles: {
    width: '250px',
  },
  profileAvailabilityStyles: {
    width: '150px',
    height: '35px',
  },
  regex: {
    phone: /^\+(?:[0-9] ?){6,14}[0-9]$/,
  },
  googleClientID: '1006100114910-tmu8rk22m8vvq42lnfofplapd8u4ifr1.apps.googleusercontent.com',
  facebookClientID: '1003222183610086',
};
