import React from 'react';
import PropTypes from 'prop-types';
import { getProfilePosts } from './api/crud';
import InfinityPostScroll from '../post/InfinityPostScroll';

import './Profile.css';

const ProfilePosts = ({ profileId }) => (
  <InfinityPostScroll
    query={(page) => getProfilePosts(profileId, page)}
    dependencies={[profileId]}
  />
);

ProfilePosts.propTypes = {
  profileId: PropTypes.number.isRequired,
};

export default ProfilePosts;
