import React, { memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileAvatar from './ProfileAvatar';
import FriendActionButtons from '../Friends/FriendActionButtons';

const ProfilesComponent = memo(({ profiles, like }) => {
  const { profileId: paramProfileId } = useParams();

  const profilesList = (profiles?.map((profile) => {
    let profileId; let name; let avatarLink;
    if (profile?.profileId) {
      profileId = profile.profileId;
      name = profile.name;
      avatarLink = profile.avatarLink;
    } else if (profile.respondUserId === Number(paramProfileId)) {
      profileId = profile.requestUserId;
      name = profile.requestName;
      avatarLink = profile.requestAvatarLink;
    } else if (profile.requestUserId === Number(paramProfileId)) {
      profileId = profile.respondUserId;
      name = profile.respondName;
      avatarLink = profile.respondAvatarLink;
    }

    return profileId && (
      <div className="profile-card" key={`profile-${profileId}`}>
        <Link className="profile-card-info" to={`/profile/${profileId}`}>
          <div className="post-img">
            <ProfileAvatar
              profileId={profileId}
              name={name}
              avatarLink={avatarLink}
            />
          </div>

          <div className="profile-list-name">
            {name}
          </div>
        </Link>

        {!like
        && (
          <FriendActionButtons showButtons={false} profileId={profileId} />
        )}
      </div>
    );
  }));

  return profilesList || <div> no any profile </div>;
});

ProfilesComponent.propTypes = {
  like: PropTypes.bool,
  profiles: PropTypes.arrayOf(PropTypes.shape({})),
};

ProfilesComponent.defaultProps = {
  like: false,
  profiles: [],
};

export default ProfilesComponent;
