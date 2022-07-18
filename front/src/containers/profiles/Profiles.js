import React from 'react';
import './Profile.css';
import { useQuery } from 'react-query';
import { getProfiles } from './api/crud';
import ProfilesComponent from '../../components/profile/ProfilesComponent';
import { ProfilesSkeletonLoader } from '../../components/loaders/ProfilesSkeletonLoader';

const Profiles = () => {
  const { isFetching, data } = useQuery('profiles', () => getProfiles());
  const profiles = data?.data.data;

  return (
    <>
      <ProfilesSkeletonLoader show={isFetching} count={5} />

      <ProfilesComponent profiles={profiles} />
    </>
  );
};

export default Profiles;
