import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../../Assets/Styles/Authorization.css';
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordForm from '../../Components/Forms/Auth/ForgotPasswordForm';
import { forgotPassword } from '../../Services/ CRUD/Auth';

const ForgotPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const handleSnack = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };
  const navigate = useNavigate();

  const resetFn = useMutation(
    'reset-password',
    (data) => forgotPassword(data),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          handleSnack(data?.data?.message, 'success');

          setTimeout(() => {
            navigate('/sign-in');
          }, 1000);
        } else {
          handleSnack(data?.data?.message, 'error');
        }
      },
    },
  );

  return (
    <Card sx={{ margin: 'auto', width: '400px' }}>
      <CardContent>
        <ForgotPasswordForm onForgot={resetFn} />
      </CardContent>
    </Card>
  );
};

export default ForgotPassword;
