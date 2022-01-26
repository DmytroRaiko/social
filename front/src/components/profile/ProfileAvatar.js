import React from 'react';
import PropTypes from 'prop-types';
import avatarIcon from '../../icons/avatarIcon.svg';

const ProfileAvatar = ({ avatarlink, profileId }) => (
  <div className={`profile-avatar profile-left-bar ${avatarlink}`}>
    <p className="post-img">
      <img src={(avatarlink && `http://localhost:9000/files/avatar/${profileId}`) || avatarIcon} alt="post" />
    </p>
    <button type="button" className="add-friend-button">Add</button>
  </div>
);

ProfileAvatar.propTypes = {
  avatarlink: PropTypes.string,
};

ProfileAvatar.defaultProps = {
  avatarlink: avatarIcon,
};

export default ProfileAvatar;
