import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import stringAvatar from '../../Services/Utils/IconColor';
import projectSettings from '../../Config';

const ProfileAvatar = memo(({
  avatarLink, profileId, name, image,
}) => (
  ((avatarLink || image)
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
  avatarLink: PropTypes.string,
  profileId: PropTypes.number.isRequired,
  name: PropTypes.string,
  image: PropTypes.string,
};

ProfileAvatar.defaultProps = {
  avatarLink: null,
  name: 'Unknown P',
  image: null,
};

export default ProfileAvatar;
