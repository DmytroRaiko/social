import React from 'react';
import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProfilesComponent from '../../Components/Profile/ProfilesComponent';

const LikeList = ({ likes, handleClose }) => (
  <>
    <header className="edit-modal-header">
      <Typography
        style={{
          fontWeight: '500',
        }}
      >
        Likes
      </Typography>
      <IconButton className="button-close" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </header>
    <div className="like-list">
      <ProfilesComponent profiles={likes} like />
    </div>
  </>
);

export default LikeList;
