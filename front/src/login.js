import { useCallback, useState } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const Login = () => {
  const [auth, setAuth] = useState();

  const handleGoogleAuth = useCallback((data) => {
    axios.post('http://localhost:9000/auth/google', {
      access_token: data.accessToken,
    })
      .then((res) => {
        console.log(res.data);
        setAuth(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  return (
    <div>
      <GoogleLogin
        clientId="1006100114910-tmu8rk22m8vvq42lnfofplapd8u4ifr1.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={handleGoogleAuth}
        onFailure={((error) => {
          console.error(error);
        })}
        cookiePolicy="single_host_origin"
      />
      {auth && (
      <div style={{
        width: '500px',
      }}
      >
        accessToken:
        {auth.accessToken}
        <br />
        refreshToken:
        {auth.refreshToken}
        <br />
        succeed
      </div>
      )}
    </div>
  );
};

export default Login;
