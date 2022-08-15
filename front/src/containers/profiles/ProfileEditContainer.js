import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { Button } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
// import EditProfileAvatar from '../../components/profile/EditProfileAvatar';
import EditProfileForm from '../forms/EditProfileForm';
import { PageLoader } from '../../components/loaders/PageLoader';
import projectSettings from '../../settings';
import { deleteProfileAvatar, editProfileAvatar } from './api/crud';
import AvatarCropModal from '../modals/AvatarCropModal';
import ProfileAvatar from '../../components/profile/ProfileAvatar';

function ProfileEditContainer({ profileData, availabilities, university }) {
  const profile = profileData[0] || null;
  const [image, setImage] = useState(
    profile.avatarlink
      ? `${projectSettings.URI}/files/avatar/${profile.profileid}`
      : null,
  );
  const [loadedImage, setLoadedImage] = useState();
  const [cropper, setCropper] = useState();
  const [openCroppedModal, setOpenCroppedModal] = useState(false);

  const openCroppedModalHandle = () => setOpenCroppedModal(true);

  const mutation = useMutation(
    'edit-avatar',
    (avatar) => editProfileAvatar(profile.profileid, avatar),
  );

  const mutationDelete = useMutation(
    'delete-avatar',
    () => deleteProfileAvatar(profile.profileid),
  );

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file.type.match('image.*')) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        setLoadedImage(fileReader.result);
        openCroppedModalHandle();
      };
      fileReader.readAsDataURL(file);
      e.target.value = null;
    } else {
      // eslint-disable-next-line no-console
      console.error('Wrong file format');
    }
  };

  const deleteImage = () => {
    mutationDelete.mutate();
    setImage(null);
    setLoadedImage(null);
  };

  const closeCroppedModalHandle = () => {
    setOpenCroppedModal(false);
    setLoadedImage(null);
  };

  const cropImage = () => {
    if (typeof cropper !== 'undefined') {
      setImage(cropper.getCroppedCanvas().toDataURL());
      cropper.getCroppedCanvas().toBlob((blob) => mutation.mutate(blob));

      setOpenCroppedModal(false);
      setLoadedImage(null);
    }
  };

  return (
    (profile && (
    <div className="profile-page">
      <div className="profile-avatar profile-left-bar">
        <AvatarCropModal
          openCroppedModal={openCroppedModal}
          closeCroppedModalHandle={closeCroppedModalHandle}
          loadedImage={loadedImage}
          cropImage={cropImage}
          setCropper={setCropper}
        />

        <div className="post-img">
          <ProfileAvatar
            profileId={profile.profileid}
            name={profile.name}
            avatarlink={image}
            image={image}
          />

          <div className="avatar-buttons">
            <Button
              className="avatar-button"
              component="label"
              startIcon={<AddAPhotoIcon />}
            >
              <input type="file" hidden onChange={handleImageChange} />
              set new photo
            </Button>

            {image && (
            <Button className="avatar-button" onClick={deleteImage}>
              <DeleteIcon />
            </Button>
            )}
          </div>
        </div>
      </div>

      <div className="profile-page-right-colmn">
        <EditProfileForm
          profile={profile}
          availabilities={availabilities}
          university={university}
        />
      </div>
    </div>
    )) || <PageLoader />
  );
}

ProfileEditContainer.propTypes = {
  profileData: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  availabilities: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  university: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
};

ProfileEditContainer.defaultProps = {
  profileData: [],
  university: [],
};

export default ProfileEditContainer;