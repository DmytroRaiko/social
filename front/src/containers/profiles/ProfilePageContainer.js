import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import profileDataProps from '../../services/PropTypes/ProfileDataProps';
import ProfilePageMainInfo from '../../components/profile/ProfilePageMainInfo';
import ProfilePosts from './ProfilePosts';
import ProfileAvatar from '../../components/profile/ProfileAvatar';
import { PageLoader } from '../../components/loaders/PageLoader';
import useAuth from '../../providers/authProvider';
import FriendBox from '../friends/FriendBox';
import FriendActionButtons from '../../components/friends/FriendActionButtons';

function ProfilePageContainer({ profileData }) {
  const profile = profileData[0] || null;
  const { user } = useAuth();

  return (
    (profile && (
    <div className="profile-page">
      <div className="profile-avatar profile-left-bar">

        <div className="profile-avatar profile-left-bar">
          <div className="post-img">
            <ProfileAvatar
              avatarLink={profile.avatarLink}
              profileId={profile.profileId}
              name={profile.name}
            />
          </div>

          <div className="profile-button-group">
            {user?.user?.profileId !== profile.profileId
              && (
              <FriendActionButtons profileId={profile.profileId} />
              )}

            {user?.user?.profileId === profile.profileId
              && (
                <Button component={Link} to={`/profile/${profile.profileId}/edit`} variant="outlined" className="">
                  <EditIcon fontSize="small" />
                  Edit
                </Button>
              )}
          </div>
        </div>
        <div className="profile-left-bar">
          <FriendBox type="request" direction="vertical" />
        </div>

        <div className="profile-left-bar">
          <FriendBox direction="vertical" />
        </div>
      </div>

      <div className="profile-page-right-colmn">
        <ProfilePageMainInfo
          name={profile.name}
          email={profile.email}
          phone={profile.phone}
          universities={profile.universities}
          emailSetting={profile.emailSetting}
          phoneSetting={profile.phoneSetting}
          universitySetting={profile.universitySetting}
          countFriends={profile.countFriends}
          countPosts={profile.countPosts}
        />

        <div className="main-content-friend-box">
          <FriendBox recommendation />
        </div>

        <ProfilePosts profileId={profile.profileId} />
      </div>
    </div>
    )) || <PageLoader />
  );
}

ProfilePageContainer.propTypes = profileDataProps;

ProfilePageContainer.defaultProps = {
  profileData: [],
};

export default ProfilePageContainer;
