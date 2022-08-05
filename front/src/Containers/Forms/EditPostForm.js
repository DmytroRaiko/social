import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import ErrorBoundary from '../../Services/Errors/ErrorBoundary';
import projectSettings from '../../Config';
import { editPost } from '../../Services/CRUD/Posts';
import PostForm from '../../Components/Forms/Posts/PostForm';

const EditPostForm = ({
  post, availabilities, onHandleClose, postEditId,
}) => {
  const photo = post.imageLink ? `${projectSettings.URI}/files/${post.imageLink}` : null;
  const [loadedPhoto, setLoadedPhoto] = useState(photo);
  const [editImage, setEditImage] = useState(photo);

  const mutation = useMutation(
    'edit-post',
    (formData) => editPost(postEditId, formData),
  );

  const postEdit = post
    && {
      text: post.text,
      postAvailabilityId: {
        label: post.availability,
        value: post.availabilityId,
      },
    };

  const onFormSubmit = (dataSubmit) => {
    const onFormData = {
      text: dataSubmit.text,
      postAvailabilityId: dataSubmit.postAvailabilityId.value,
    };

    if (loadedPhoto) {
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
        setImage={setEditImage}
        availabilities={availabilities}
        image={editImage}
        initialValues={postEdit}
        onFormSubmit={onFormSubmit}
        onHandleClose={onHandleClose}
      />
    </ErrorBoundary>
  );
};

EditPostForm.propTypes = {
  post: PropTypes.shape({}),
  availabilities: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  onHandleClose: PropTypes.func,
  postEditId: PropTypes.number,
};

EditPostForm.defaultProps = {
  post: {
    text: '',
    postAvailabilityId: projectSettings.availability,
  },
  availabilities: [],
};

export default EditPostForm;
