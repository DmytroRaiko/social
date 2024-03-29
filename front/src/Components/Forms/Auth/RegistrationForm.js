import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-mui';
import { Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { textFieldMessages, buttons } from '../../../Services/Constants';

const RegistrationForm = ({ onRegister }) => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
  };

  const schema = Yup.object().shape({
    name: Yup.string().required(textFieldMessages.requiredField),
    email: Yup
      .string()
      .email(textFieldMessages.emailIsNotValid)
      .required(textFieldMessages.requiredField),
    password: Yup
      .string()
      .min(8, textFieldMessages.tooShort)
      .required(textFieldMessages.requiredField),
    passwordRepeat: Yup
      .string()
      .oneOf([Yup.ref('password'), null], 'Passwords do not match')
      .required(textFieldMessages.requiredField),
  });

  const login = (formData, { setSubmitting }) => {
    onRegister.mutate(formData);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={login} validationSchema={schema}>
        {() => (
          <Form className="auth-form">
            <div
              className="form-element"
            >
              <Typography className="label">
                Your name
              </Typography>

              <Field
                component={TextField}
                name="name"
                type="text"
                placeholder="Your name"
                fullWidth
              />
            </div>

            <div
              className="form-element"
            >
              <Typography className="label">
                Email
              </Typography>

              <Field
                component={TextField}
                name="email"
                type="text"
                placeholder="Email"
                fullWidth
              />
            </div>

            <div
              className="form-element"
            >
              <Typography className="label">
                Password
              </Typography>

              <Field
                component={TextField}
                name="password"
                type="password"
                placeholder="Password"
                fullWidth
              />
            </div>

            <div
              className="form-element"
            >
              <Typography className="label">
                Repeat your password
              </Typography>

              <Field
                component={TextField}
                name="passwordRepeat"
                type="password"
                placeholder="Repeat your password"
                fullWidth
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              className="form-element btn"
            >
              {buttons.signUp}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

RegistrationForm.propTypes = {
  onRegister: PropTypes.shape({}).isRequired,
};

export default RegistrationForm;
