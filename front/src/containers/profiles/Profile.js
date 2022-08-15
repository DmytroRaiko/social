import React from 'react';
import './Profile.css';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getProfile } from './api/crud';
import ProfilePageContainer from './ProfilePageContainer';
import { PageLoader } from '../../components/loaders/PageLoader';

const Profile = () => {
  const params = useParams();

  if (/^[0-9]*$/m.exec(params.profileId)) {
    const { profileId } = params;

    const {
      isFetching,
      data,
    } = useQuery(
      `profile-${profileId}`,
      () => getProfile(profileId),
    );
    const profile = data?.data.data;

    return (
      <div className="profile-main-page">
        {isFetching && <PageLoader />}
        <ProfilePageContainer profileData={profile} />
      </div>
    );
  }
  return <div>Error id</div>;
};

export default Profile;
