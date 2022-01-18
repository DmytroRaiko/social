import React from 'react';
import './Profile.css';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getProfile } from './api/crud';
import ProfileComponent from '../../components/profile/ProfileComponent';

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
      <>
        {isFetching && <div>Loading...</div>}
        <ProfileComponent profileData={profile} />
      </>
    );
  }
  return <div>Error id</div>;
};

export default Profile;
