import { Button, CardMedia, IconButton } from '@mui/material';
import { Attachment, Delete } from '@mui/icons-material';
import React from 'react';
import { buttons } from '../../Services/Constants';

const ImageLoadPost = ({
  image, onAttachPhoto, onDeletePhoto, setFieldValue,
}) => (
  <>
    {!image
  && (
    <Button
      variant="outlined"
      component="label"
      startIcon={<Attachment />}
    >
      <input type="file" name="image" hidden onChange={(e) => onAttachPhoto(e, setFieldValue)} />
      {buttons.attach}
    </Button>
  )}
    {image
  && (
    <div className="attached-photo">
      <CardMedia
        component="img"
        height="120"
        width="auto"
        image={image}
        alt="Article attachment"
        sx={{
          border: 1,
          borderColor: 'grey.500',
        }}
      />
      <div className="attached-photo-delete">
        <IconButton
          color="primary"
          className="icon Button"
          aria-label="delete"
          onClick={onDeletePhoto}
        >
          <Delete />
        </IconButton>
      </div>
    </div>
  )}
  </>
);

export default ImageLoadPost;
