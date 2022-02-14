const Yup = require('yup');

module.exports = Yup.object().shape({
  label: Yup.string().required(),
  value: Yup.string().required(),
}).typeError('Invalid value');
