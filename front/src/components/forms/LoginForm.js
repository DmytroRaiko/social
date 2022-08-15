import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-mui';
import { Button, Link, Typography } from '@mui/material';
import { Link as DomLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoginForm = ({ onLogin }) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const schema = Yup.object().shape({
    email: Yup.string().email('Please, enter correct email!').required('Email is required!'),
    password: Yup.string().required('Password is required!').min(8, 'Too short'),
  });

  const login = (formData, { setSubmitting }) => {
    onLogin.mutate(formData);
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
              <div className="passwordTitle label">
                <Typography className="label">
                  Password
                </Typography>

                <Link
                  to="/forgot-password"
                  component={DomLink}
                  underline="hover"
                  sx={{
                    fontSize: '14px',
                  }}
                >
                  Forgot password?
                </Link>
              </div>
              <Field
                component={TextField}
                name="password"
                type="password"
                placeholder="Password"
                fullWidth
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              className="form-element btn"
            >
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.shape({}).isRequired,
};

export default LoginForm;
