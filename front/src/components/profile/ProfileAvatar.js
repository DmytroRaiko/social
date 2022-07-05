import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import stringAvatar from '../../services/icons/avatarIcon';
import projectSettings from '../../settings';
import useAuth from '../../containers/providers/authProvider';

const ProfileAvatar = ({ avatarlink, profileId, name }) => {
  const { user } = useAuth();

  return (
    <div className={`profile-avatar profile-left-bar ${avatarlink}`}>
      <div className="post-img">
        {(avatarlink
        && (
          <img
            className="avatar"
            src={`${projectSettings.URI}/files/avatar/${profileId}`}
            alt="avatar"
          />
        )
        )
      // eslint-disable-next-line react/jsx-props-no-spreading
      || <Avatar className="post-img" {...stringAvatar(name)} />}
      </div>
      <div className="profile-button-group">
        {user?.user?.profileid !== profileId
          && (
            <Button variant="contained">Add</Button>

          )}

        {user?.user?.profileid === profileId
          && (
          <Button component={Link} to={`/profile/${profileId}/edit`} variant="outlined" className="">
            <EditIcon fontSize="small" />
            Edit
          </Button>
          )}
      </div>
    </div>
  );
};

ProfileAvatar.propTypes = {
  avatarlink: PropTypes.string,
  profileId: PropTypes.number.isRequired,
  name: PropTypes.string,
};

ProfileAvatar.defaultProps = {
  avatarlink: null,
  name: 'Unknown P',
};

export default ProfileAvatar;
