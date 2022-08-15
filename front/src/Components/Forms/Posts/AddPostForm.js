import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import ErrorBoundary from '../../../Services/Errors/ErrorBoundary';
import projectSettings from '../../../Config';
import { addPost } from '../../../Services/CRUD/Posts';
import PostForm from './PostForm';

const AddPostForm = ({ availabilities, onHandleClose }) => {
  const [loadedPhoto, setLoadedPhoto] = useState();
  const [newPhoto, setNewPhoto] = useState();

  const newPost = {
    text: '',
    postAvailabilityId: projectSettings.availability,
  };

  const mutation = useMutation(
    'add-post',
    (formData) => addPost(formData),
  );

  const onFormSubmit = (dataSubmit) => {
    const onFormData = {
      text: dataSubmit.text,
      postAvailabilityId: dataSubmit.postAvailabilityId.value,
    };

    if (newPhoto) {
      onFormData.postImage = loadedPhoto;
    }

    mutation.mutate(onFormData);

    if (!mutation.isLoading) {
      onHandleClose();
    }
  };

  return (
    <ErrorBoundary>
      <PostForm
        setLoadedPhoto={setLoadedPhoto}
        availabilities={availabilities}
        image={newPhoto}
        setImage={setNewPhoto}
        initialValues={newPost}
        onFormSubmit={onFormSubmit}
        onHandleClose={onHandleClose}
      />
    </ErrorBoundary>
  );
};

AddPostForm.propTypes = {
  availabilities: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  onHandleClose: PropTypes.func,
};

AddPostForm.defaultProps = {
  availabilities: [],
};

export default AddPostForm;
