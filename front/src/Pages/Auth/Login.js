import React from 'react';
// import axios from 'axios';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../../Assets/Styles/Authorization.css';
import { useMutation } from 'react-query';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import LoginForm from '../../Components/Forms/Auth/LoginForm';
import { login, facebookOAuth, googleOAuth } from '../../Services/ CRUD/Auth';
import SocialBtns from '../../Components/Auth/SocialBtns';
import useAuth from '../../Services/Providers/authProvider';

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const handleSnack = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };
  const { loginFn } = useAuth();

  const loginQuery = useMutation(
    'login',
    (data) => login(data),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          handleSnack('You are log in!', 'success');
          loginFn(true, data?.data);
        } else {
          handleSnack(data?.data?.message, 'error');
        }
      },
      onError: (data) => {
        // eslint-disable-next-line no-console
        console.error(data);
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
        <div color="inherit" className="tab selected">Sign in</div>
        <Button
          color="inherit"
          component={Link}
          to="/sign-up"
          fullWidth
          className="tab"
        >
          Sign up
        </Button>
      </div>

      <CardContent>
        <LoginForm
          onLogin={loginQuery}
        />

        <SocialBtns
          handleFacebookAuth={handleFacebookAuth}
          handleGoogleAuth={handleGoogleAuth}
        />
      </CardContent>
    </Card>
  );
};

export default Login;
