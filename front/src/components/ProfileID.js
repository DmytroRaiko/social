import React from 'react';
import UserProps from '../PropTypes/UserProps';
import ProfilePropsDefault from '../PropTypes/ProfilePropsDefault';

const ProfileID = ({ user }) => (
  <h1>
    Homework. Front.
    {JSON.stringify(user)}
  </h1>
);

ProfileID.propTypes = UserProps;

ProfileID.defaultProps = ProfilePropsDefault;

export default ProfileID;
