import React from 'react';
import './Profile.css';
import { useQuery } from 'react-query';
import { getProfiles } from './api/crud';
import ProfilesComponent from '../../components/profile/ProfilesComponent';

const Profiles = () => {
  const { isFetching, /* refetch, */ data } = useQuery('profiles', () => getProfiles());
  const profiles = data?.data.data;

  return (
    <>
      {isFetching && <div>Loading...</div>}
      <ProfilesComponent profiles={profiles} />
    </>
  );
};

export default Profiles;
