import React, { memo } from 'react';
import Box from '@mui/material/Box';
import { Button, Modal, MenuItem } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PropTypes from 'prop-types';
import EditPost from '../Post/EditPost';

const EditPostModal = memo(({
  id,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <MenuItem
        component={Button}
        onClick={handleOpen}
        sx={{
          width: '100%',
          textTransform: 'capitalize',
        }}
      >
        <EditOutlinedIcon style={{ marginRight: '10px' }} />
        Edit
      </MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="edit-modal modal">
          <EditPost postId={id} handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
});

EditPostModal.propTypes = {
  id: PropTypes.number.isRequired,
};

export default EditPostModal;
