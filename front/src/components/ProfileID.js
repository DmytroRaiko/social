import React from 'react';
import ProfileProps from '../PropTypes/ProfileProps';
import ProfilePropsDefault from '../PropTypes/ProfilePropsDefault';

const ProfileID = ({ user }) => (
  <h1>
    Homework. Front.
    {JSON.stringify(user)}
  </h1>
);

ProfileID.propTypes = ProfileProps;

ProfileID.defaultProps = ProfilePropsDefault;

export default ProfileID;
