import React from 'react';
import PropTypes from 'prop-types';
import ProfileAvatar from '../../components/profile/ProfileAvatar';
import EditProfileForm from '../../components/forms/EditProfileForm';

function ProfileEditContainer({ profileData, availabilities, university }) {
  const profile = profileData[0] || null;

  return (
    (profile && (
    <div className="profile-page">
      <div className="profile-avatar profile-left-bar">
        <ProfileAvatar
          avatarlink={profile.avatarlink}
          profileId={profile.profileid}
          name={profile.name}
        />
      </div>

      <div className="profile-page-right-colmn">
        <EditProfileForm
          name={profile.name}
          email={profile.email || undefined}
          phone={profile.phone || undefined}
          universities={profile.universities}
          emailsettingid={profile.emailsettingid}
          phonesettingid={profile.phonesettingid}
          universitysettingid={profile.universitysettingid}
          availabilities={availabilities}
          university={university}
        />
      </div>
    </div>
    )) || <div> loading...</div>
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
