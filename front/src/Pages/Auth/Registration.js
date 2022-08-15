import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../../Assets/Styles/Authorization.css';
import { useMutation } from 'react-query';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import RegistrationForm from '../../Components/Forms/Auth/RegistrationForm';
import { registration, facebookOAuth, googleOAuth } from '../../Services/CRUD/Auth';
import SocialBtns from '../../Components/Auth/SocialBtns';
import useAuth from '../../Services/Providers/authProvider';
import { createdAccount, pleaseActivate, youLogin } from '../../Services/Constants/Messages';

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
          handleSnack(createdAccount, 'success');
          handleSnack(pleaseActivate, 'success');

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
          handleSnack(youLogin, 'success');
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
          handleSnack(youLogin, 'success');
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
