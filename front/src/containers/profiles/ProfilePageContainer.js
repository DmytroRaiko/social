import React from 'react';
import profileDataProps from '../../services/PropTypes/ProfileDataProps';
import ProfilePageMainInfo from '../../components/profile/ProfilePageMainInfo';
import ProfilePosts from './ProfilePosts';
import ProfileAvatar from '../../components/profile/ProfileAvatar';

function ProfilePageContainer({ profileData }) {
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
        <div className="profile-left-bar">
          {null}
        </div>
      </div>

      <div className="profile-page-right-colmn">
        <ProfilePageMainInfo
          name={profile.name}
          email={profile.email}
          phone={profile.phone}
          universities={profile.universities}
          profileid={profile.profileid}
          emailsetting={profile.emailsetting}
          phonesetting={profile.phonesetting}
          universitysetting={profile.universitysetting}
          avatarlink={profile.avatarlink}
          countfriends={profile.countfriends}
          countposts={profile.countposts}
        />
        <ProfilePosts profileId={profile.profileid} />
      </div>
    </div>
    )) || <div> loading...</div>
  );
}

ProfilePageContainer.propTypes = profileDataProps;

ProfilePageContainer.defaultProps = {
  profileData: [],
};

export default ProfilePageContainer;
