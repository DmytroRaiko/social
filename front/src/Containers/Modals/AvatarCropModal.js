import React, { memo } from 'react';
import Cropper from 'react-cropper';
import { Button, Modal } from '@mui/material';
import PropTypes from 'prop-types';
import 'cropperjs/dist/cropper.css';
import { buttons } from '../../Services/Constants';

const AvatarCropModal = memo(({
  openCroppedModal,
  closeCroppedModalHandle,
  loadedImage,
  setCropper,
  cropImage,
}) => (
  <Modal
    keepMounted
    open={openCroppedModal}
    onClose={closeCroppedModalHandle}
  >
    <div className="modal modal-crop">
      <Cropper
        src={loadedImage}
        style={{ height: 650, width: '100%' }}
        onInitialized={(instance) => setCropper(instance)}
        rotatable={false}
        aspectRatio={3 / 3}
        viewMode={1}
        modal
      />
      <div className="modal-footer-block">
        <Button
          variant="text"
          onClick={closeCroppedModalHandle}
        >
          {buttons.close}
        </Button>
        <Button variant="contained" onClick={cropImage}>
          {buttons.crop}
        </Button>
      </div>
    </div>
  </Modal>
));

AvatarCropModal.propTypes = {
  openCroppedModal: PropTypes.bool,
  closeCroppedModalHandle: PropTypes.func,
  loadedImage: PropTypes.string,
  setCropper: PropTypes.func,
  cropImage: PropTypes.func,
};

AvatarCropModal.defaultProps = {
  openCroppedModal: false,
  loadedImage: null,
};

export default AvatarCropModal;
