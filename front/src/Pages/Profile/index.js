import React from 'react';
import '../../Assets/Styles/Profile.css';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../Services/CRUD/Profiles';
import ProfilePageContainer from '../../Containers/Profiles/ProfilePageContainer';
import { PageLoader } from '../../Layouts/Loaders/PageLoader';

const Profile = () => {
  const params = useParams();
  const { profileId } = params;

  if (!/^[0-9]*$/m.exec(profileId)) return <div>Error id</div>;

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
};

export default Profile;
