import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import ErrorBoundary from '../../../components/ErrorBoundary';
import projectSettings from '../../../settings';
import { editPost } from '../api/crud';
import FormikPost from '../../../components/forms/FormikPost';

const EditPostForm = ({
  post, availabilities, onHandleClose, postEditId,
}) => {
  const photo = post.imagelink ? `${projectSettings.URI}/files/${post.imagelink}` : null;
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
        value: post.availabilityid,
      },
    };

  const onFormSubmit = (dataSubmit) => {
    const onFormData = {
      text: dataSubmit.text,
      postavailabilityid: dataSubmit.postAvailabilityId.value,
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
      <FormikPost
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
    postavailabilityid: projectSettings.availability,
  },
  availabilities: [],
};

export default EditPostForm;
