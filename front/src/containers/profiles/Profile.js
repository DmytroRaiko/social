import React from 'react';
import './Profile.css';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getProfile } from './api/crud';
import ProfilePageContainer from './ProfilePageContainer';

const Profile = () => {
  const params = useParams();

  if (/^[0-9]*$/m.exec(params.id)) {
    const profileId = params.id;

    const {
      isFetching,
      /* refetch, */
      data,
    } = useQuery(
      `profile-${profileId}`,
      () => getProfile(profileId),
    );
    const profile = data?.data.data;

    return (
      <div className="profile-main-page">
        {isFetching && <div>Loading...</div>}
        <ProfilePageContainer profileData={profile} />
      </div>
    );
  }
  return <div>Error id</div>;
};

export default Profile;
