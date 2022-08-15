const Yup = require('yup');
const { requiredField } = require('../Constants/TextFieldMessages');

module.exports = Yup.object().shape({
  label: Yup.string().required(requiredField),
  value: Yup.string().required(requiredField),
}).typeError('Invalid value');
