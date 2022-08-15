import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { googleClientID, facebookClientID } from '../../Config';

const SocialBtns = ({
  handleGoogleAuth, handleFacebookAuth,
}) => (
  <div className="social-btns-block">
    <div className="or-separator">
      <hr />
      or
      <hr />
    </div>

    <div className="social-btns">
      <GoogleLogin
        clientId={googleClientID}
        onSuccess={(data) => handleGoogleAuth.mutate(data?.accessToken)}
        onFailure={((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        })}
        cookiePolicy="single_host_origin"
      />
      <FacebookLogin
        appId={facebookClientID}
        autoLoad
        fields="name,email"
        scope="public_profile,user_friends"
        callback={(data) => handleFacebookAuth.mutate(data?.accessToken)}
        icon="fa-facebook"
        size="small"
      />
    </div>
  </div>
);

export default SocialBtns;
