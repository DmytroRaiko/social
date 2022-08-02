import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@mui/material';
import { Link as DOMLink } from 'react-router-dom';
import ProfileAvatar from '../Profile/ProfileAvatar';
import FriendActionButtons from './FriendActionButtons';

const FriendProfileComponent = ({ profiles }) => profiles?.map((profile) => (
  <div
    className="content"
    key={`friend-element-${profile.friendId}-${profile.profileId}`}
  >
    <Link
      component={DOMLink}
      className="profile-info"
      underline="none"
      color="inherit"
      to={`/profile/${profile.profileId}`}
    >
      <ProfileAvatar
        profileId={profile.profileId}
        avatarLink={profile.avatarLink}
        name={profile.name}
      />

      <div className="name">
        {profile.name}
      </div>
    </Link>

    <FriendActionButtons profile={profile} />
  </div>
));

FriendProfileComponent.propTypes = {
  profiles: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
};

FriendProfileComponent.defaultProps = {
  profiles: [],
};

export default FriendProfileComponent;
