import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import ProfileAvatar from './ProfileAvatar';

const ProfilesComponent = memo(({ profiles }) => {
  const profilesList = profiles?.map((profile) => (
    <div className="profile-card" key={`profile-${profile.profileid}`}>
      <Link className="profile-card-info" to={`/profile/${profile.profileid}`}>
        <div className="post-img">
          <ProfileAvatar
            profileId={profile.profileid}
            name={profile.name}
            avatarlink={profile.avatarlink}
          />
        </div>

        <div className="profile-list-name">
          {profile.name}
        </div>
      </Link>

      <Button variant="contained">Add</Button>
    </div>
  ));

  return profilesList || <div> no any profile </div>;
});

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
