import React from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getAvailability } from './api/crud';
import AddPostForm from '../../components/forms/AddPostForm';
import { Loader } from '../../components/Loader';

const EditPost = ({ handleClose }) => {
  const availabilityQuery = useQuery('availabilities', () => getAvailability());
  const availabilityIsFetching = availabilityQuery.isFetching;
  const availabilityData = availabilityQuery.data;

  const availabilities = availabilityData?.data.data;

  return (
    <>
      {availabilityIsFetching && <Loader />}
      {availabilities && (
      <>
        <header className="add-modal-header">
          <Typography
            style={{
              fontWeight: '500',
            }}
          >
            Add article
          </Typography>
          <IconButton className="button-close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </header>
        <AddPostForm
          availabilities={availabilities}
          onHandleClose={handleClose}
        />
      </>
      )}
    </>
  );
};

EditPost.propTypes = {
  handleClose: PropTypes.func,
};

export default EditPost;
