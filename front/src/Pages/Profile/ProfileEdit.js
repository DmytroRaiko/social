import React from 'react';
import '../../Assets/Styles/Profile.css';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getEditProfile } from '../../Services/CRUD/Profiles';
import ProfileEditContainer from '../../Containers/Profiles/ProfileEditContainer';
import { getAvailability, getUniversities } from '../../Services/CRUD/Posts';
import { PageLoader } from '../../Layouts/Loaders/PageLoader';

const ProfileEdit = () => {
  const { profileId } = useParams();

  if (!/^[0-9]*$/m.exec(profileId)) return <div>Error id</div>;

  const {
    isFetching: profileIsFetching,
    data: profileData,
  } = useQuery(`profile-edit-${profileId}`, () => getEditProfile(profileId));
  const {
    isFetching: availabilityIsFetching,
    data: availabilityData,
  } = useQuery('availabilities', () => getAvailability());
  const {
    isFetching: universitiesIsFetching,
    data: universitiesData,
  } = useQuery('universities', () => getUniversities());

  const profileEdit = profileData?.data.data;
  const availabilities = availabilityData?.data.data;
  const universities = universitiesData?.data.data;

  return (
    <div className="profile-main-page">
      {
          (profileIsFetching || availabilityIsFetching || universitiesIsFetching)
          && <PageLoader />
        }
      { profileEdit && availabilities && universities
          && (
          <ProfileEditContainer
            profileData={profileEdit}
            availabilities={availabilities}
            university={universities}
          />
          )}
    </div>
  );
};

export default ProfileEdit;
