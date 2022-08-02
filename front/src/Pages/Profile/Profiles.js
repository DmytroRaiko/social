import React from 'react';
import '../../Assets/Styles/Profile.css';
import { useQuery } from 'react-query';
import { getProfiles } from '../../Services/ CRUD/Profiles';
import ProfilesComponent from '../../Components/Profile/ProfilesComponent';
import { ProfilesSkeletonLoader } from '../../Layouts/Loaders/ProfilesSkeletonLoader';

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
