import React, { memo } from 'react';
import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
import PropTypes from 'prop-types';
import AddUniversityForm from '../../Components/Forms/Profiles/AddUniversityForm';

const AddUniversityModal = memo(({
  open, handleClose,
}) => (
  <Modal
    open={open?.open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box className="edit-modal modal">
      <AddUniversityForm data={open?.data} handleClose={handleClose} />
    </Box>
  </Modal>
));

AddUniversityModal.propTypes = {
  open: PropTypes.shape({}),
  handleClose: PropTypes.func.isRequired,
};

export default AddUniversityModal;
