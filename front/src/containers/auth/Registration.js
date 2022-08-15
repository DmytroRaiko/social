import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './Authorization.css';
import { useMutation } from 'react-query';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import RegistrationForm from '../../components/forms/RegistrationForm';
import { registration, facebookOAuth, googleOAuth } from './api/crud';
import SocialBtns from '../../components/auth/SocialBtns';
import useAuth from '../../providers/authProvider';

const Registration = () => {
  const { enqueueSnackbar } = useSnackbar();
  const handleSnack = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };
  const navigate = useNavigate();
  const { loginFn } = useAuth();

  const registerFn = useMutation(
    'registration',
    (data) => registration(data),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          handleSnack('Account created!', 'success');
          handleSnack('Please, activate your account! We send you mail!', 'success');

          setTimeout(() => {
            navigate('/sign-in');
          }, 1500);
        } else {
          handleSnack(data?.data?.message, 'error');
        }
      },
    },
  );
  const handleGoogleAuth = useMutation(
    'google-auth',
    (data) => googleOAuth(data),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          handleSnack('You are log in!', 'success');
          loginFn(true, data?.data);
        } else {
          handleSnack(data?.data?.message, 'error');
        }
      },
    },
  );
  const handleFacebookAuth = useMutation(
    'facebook-auth',
    (data) => facebookOAuth(data),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          handleSnack('You are log in!', 'success');
          loginFn(true, data?.data);
        } else {
          handleSnack(data?.data?.message, 'error');
        }
      },
    },
  );

  return (
    <Card sx={{ margin: 'auto', width: '400px' }}>
      <div className="auth-header-form login">
        <Button
          color="inherit"
          component={Link}
          to="/sign-in"
          fullWidth
          className="tab"
        >
          Sign in
        </Button>

        <div color="inherit" className="tab selected">Sign up</div>
      </div>

      <CardContent>
        <RegistrationForm onRegister={registerFn} />

        <SocialBtns
          handleFacebookAuth={handleFacebookAuth}
          handleGoogleAuth={handleGoogleAuth}
        />
      </CardContent>
    </Card>
  );
};

export default Registration;
