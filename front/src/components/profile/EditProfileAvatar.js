import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useMutation } from 'react-query';
import stringAvatar from '../../services/icons/avatarIcon';
import projectSettings from '../../settings';
import AvatarCropModal from '../../containers/modals/AvatarCropModal';
import { deleteProfileAvatar, editProfileAvatar } from '../../containers/profiles/api/crud';

const EditProfileAvatar = ({ avatarlink, profileId, name }) => {
  const [image, setImage] = useState(
    avatarlink
      ? `${projectSettings.URI}/files/avatar/${profileId}`
      : null,
  );
  const [loadedImage, setLoadedImage] = useState();
  const [cropper, setCropper] = useState();
  const [openCroppedModal, setOpenCroppedModal] = useState(false);

  const openCroppedModalHandle = () => setOpenCroppedModal(true);

  const mutation = useMutation(
    'edit-avatar',
    (avatar) => editProfileAvatar(profileId, avatar),
  );

  const mutationDelete = useMutation(
    'delete-avatar',
    () => deleteProfileAvatar(profileId),
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
    <div className="profile-avatar profile-left-bar">
      <AvatarCropModal
        openCroppedModal={openCroppedModal}
        closeCroppedModalHandle={closeCroppedModalHandle}
        loadedImage={loadedImage}
        cropImage={cropImage}
        setCropper={setCropper}
      />

      <div className="post-img">
        {(image
          && (
          <img
            className="avatar"
            src={image}
            alt="avatar"
          />
          )
        )
        // eslint-disable-next-line react/jsx-props-no-spreading
        || <Avatar className="post-img" {...stringAvatar(name)} />}
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
  );
};

EditProfileAvatar.propTypes = {
  avatarlink: PropTypes.string,
  profileId: PropTypes.number.isRequired,
  name: PropTypes.string,
};

EditProfileAvatar.defaultProps = {
  avatarlink: null,
  name: 'Unknown P',
};

export default EditProfileAvatar;
