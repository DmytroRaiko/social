import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-mui';
import { Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ForgotPasswordForm = ({ onReset }) => {
  const initialValues = {
    password: '',
    passwordRepeat: '',
  };

  const schema = Yup.object().shape({
    password: Yup.string().min(8, 'Too short!').required('Password is required!'),
    passwordRepeat: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match').required('Please, repeat your password!'),
  });

  const login = (formData, { resetForm }) => {
    onReset.mutate(formData);
    resetForm();
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
              Reset
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ForgotPasswordForm.propTypes = {
  onReset: PropTypes.shape({}).isRequired,
};

export default ForgotPasswordForm;
