import React from 'react';
import PropTypes from 'prop-types';
import { getProfilePosts } from '../../Services/ CRUD/Profiles';
import InfinityPostScroll from '../../Layouts/InfinityPost/InfinityPostScroll';

import '../../Assets/Styles/Profile.css';

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
