import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar, Button } from '@mui/material';
import stringAvatar from '../../services/icons/avatarIcon';
import projectSettings from '../../settings';

function ProfilesComponent({ profiles }) {
  const profilesList = profiles?.map((profile) => (
    <div className="profile-card" key={`profile-${profile.profileid}`}>
      <Link className="profile-card-info" to={`/profile/${profile.profileid}`}>
        <div className="post-img">
          {(profile.avatarlink
              && (
              <img
                className="avatar"
                src={`${projectSettings.URI}/files/avatar/${profile.profileid}`}
                alt="avatar"
              />
              )
          )
            // eslint-disable-next-line react/jsx-props-no-spreading
            || <Avatar className="post-img" {...stringAvatar(profile.name)} />}
        </div>

        <div className="profile-list-name">
          {profile.name}
        </div>
      </Link>

      <Button variant="contained">Add</Button>
    </div>
  ));

  return profilesList || <div> no any profile </div>;
}

ProfilesComponent.propTypes = {
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      profileid: PropTypes.number.isRequired,
      avatarlink: PropTypes.string,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ),
};

ProfilesComponent.defaultProps = {
  profiles: [],
};

export default ProfilesComponent;
