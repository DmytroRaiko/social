import React from 'react';
import PropTypes from 'prop-types';
import EditProfileAvatar from '../../components/profile/EditProfileAvatar';
import EditProfileForm from '../forms/EditProfileForm';
import { PageLoader } from '../../components/loaders/PageLoader';

function ProfileEditContainer({ profileData, availabilities, university }) {
  const profile = profileData[0] || null;

  return (
    (profile && (
    <div className="profile-page">
      <div className="profile-avatar profile-left-bar">
        <EditProfileAvatar
          avatarlink={profile.avatarlink}
          profileId={profile.profileid}
          name={profile.name}
        />
      </div>

      <div className="profile-page-right-colmn">
        <EditProfileForm
          profile={profile}
          availabilities={availabilities}
          university={university}
        />
      </div>
    </div>
    )) || <PageLoader />
  );
}

ProfileEditContainer.propTypes = {
  profileData: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  availabilities: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  university: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
};

ProfileEditContainer.defaultProps = {
  profileData: [],
  university: [],
};

export default ProfileEditContainer;
