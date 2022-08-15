import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import stringAvatar from '../../services/icons/avatarIcon';
import projectSettings from '../../settings';

const ProfileAvatar = memo(({
  avatarlink, profileId, name, image,
}) => (
  ((avatarlink || image)
    && (
      <Avatar
        className="avatar"
        src={image || `${projectSettings.URI}/files/avatar/${profileId}`}
        alt="avatar"
      />
    )
  )
    // eslint-disable-next-line react/jsx-props-no-spreading
    || <Avatar className="post-img" {...stringAvatar(name)} />
));

ProfileAvatar.propTypes = {
  avatarlink: PropTypes.string,
  profileId: PropTypes.number.isRequired,
  name: PropTypes.string,
  image: PropTypes.string,
};

ProfileAvatar.defaultProps = {
  avatarlink: null,
  name: 'Unknown P',
  image: null,
};

export default ProfileAvatar;
