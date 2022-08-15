import React, { memo } from 'react';
import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
import LikeList from '../Post/LikeList';

const LikesModal = memo(({ open, handleClose, likes }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box
      className="edit-modal modal"
      sx={{
        width: '350px',
      }}
    >
      <LikeList handleClose={handleClose} likes={likes} />
    </Box>
  </Modal>
));

export default LikesModal;
