import React from 'react';
import './Profile.css';
import { useQuery } from 'react-query';
import { getProfiles } from './api/crud';
import ProfilesComponent from '../../components/profile/ProfilesComponent';
import { Loader } from '../../components/Loader';

const Profiles = () => {
  const { isFetching, /* refetch, */ data } = useQuery('profiles', () => getProfiles());
  const profiles = data?.data.data;

  return (
    <>
      {isFetching && <Loader />}
      <ProfilesComponent profiles={profiles} />
    </>
  );
};

export default Profiles;
