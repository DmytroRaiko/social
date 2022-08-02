import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileAvatar from './ProfileAvatar';
import FriendActionButtons from '../Friends/FriendActionButtons';

const ProfilesComponent = memo(({ profiles, like }) => {
  const profilesList = profiles?.map((profile) => (
    <div className="profile-card" key={`profile-${profile.profileId}`}>
      <Link className="profile-card-info" to={`/profile/${profile.profileId}`}>
        <div className="post-img">
          <ProfileAvatar
            profileId={profile.profileId}
            name={profile.name}
            avatarLink={profile.avatarLink}
          />
        </div>

        <div className="profile-list-name">
          {profile.name}
        </div>
      </Link>

      {!like
        && (
          <FriendActionButtons profileId={profile.profileId} />
        )}
    </div>
  ));

  return profilesList || <div> no any profile </div>;
});

ProfilesComponent.propTypes = {
  like: PropTypes.bool,
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      profileId: PropTypes.number.isRequired,
      avatarLink: PropTypes.string,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ),
};

ProfilesComponent.defaultProps = {
  like: false,
  profiles: [],
};

export default ProfilesComponent;
