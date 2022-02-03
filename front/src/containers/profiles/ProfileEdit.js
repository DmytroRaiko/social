import React from 'react';
import './Profile.css';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getEditProfile } from './api/crud';
import ProfileEditContainer from './ProfileEditContainer';
import { getAvailability, getUniversities } from '../post/api/crud';

const ProfileEdit = () => {
  const params = useParams();

  if (/^[0-9]*$/m.exec(params.id)) {
    const profileId = params.id;

    const profileQuery = useQuery(`profile-edit-${profileId}`, () => getEditProfile(profileId));
    const availabilityQuery = useQuery('availabilities', () => getAvailability());
    const universitiesQuery = useQuery('universities', () => getUniversities());
    const profileIsFetching = profileQuery.isFetching;
    const availabilityIsFetching = availabilityQuery.isFetching;
    const universitiesIsFetching = universitiesQuery.isFetching;
    const profileData = profileQuery.data;
    const availabilityData = availabilityQuery.data;
    const universitiesData = universitiesQuery.data;

    const profileEdit = profileData?.data.data;
    const availabilities = availabilityData?.data.data;
    const universities = universitiesData?.data.data;

    return (
      <div className="profile-main-page">
        {
          (profileIsFetching || availabilityIsFetching || universitiesIsFetching)
          && <div>Loading...</div>
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
  }
  return <div>Error id</div>;
};

export default ProfileEdit;
