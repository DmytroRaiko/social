import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getFriends } from '../../Services/CRUD/Friends';
import ProfilesComponent from '../../Components/Profile/ProfilesComponent';
import { ProfilesSkeletonLoader } from '../../Layouts/Loaders/ProfilesSkeletonLoader';
import '../../Assets/Styles/Profile.css';
import ProfilesLayout from '../../Layouts/Profiles';

const Friends = () => {
  const params = useParams();
  const { profileId } = params;

  if (!/^[0-9]*$/m.exec(profileId)) return <div>Error id</div>;

  const {
    isFetching,
    data,
  } = useQuery(
    `friends-${profileId}`,
    () => getFriends(profileId),
  );
  const profiles = data?.data.data;

  return (
    <ProfilesLayout title="Friends">
      <ProfilesSkeletonLoader show={isFetching} count={5} />
      <ProfilesComponent profiles={profiles} />
    </ProfilesLayout>
  );
};

export default Friends;
