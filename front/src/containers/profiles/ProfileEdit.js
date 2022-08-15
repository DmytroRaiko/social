import React from 'react';
import './Profile.css';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getEditProfile } from './api/crud';
import ProfileEditContainer from './ProfileEditContainer';
import { getAvailability, getUniversities } from '../post/api/crud';
import { PageLoader } from '../../components/loaders/PageLoader';

const ProfileEdit = () => {
  const params = useParams();

  if (/^[0-9]*$/m.exec(params.profileId)) {
    const { profileId } = params;

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
  }
  return <div>Error id</div>;
};

export default ProfileEdit;
