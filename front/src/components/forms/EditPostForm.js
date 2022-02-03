import React from 'react';
import {
  Formik, Form, Field,
} from 'formik';
import {
  TextField,
} from 'formik-mui';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import SaveIcon from '@mui/icons-material/Save';
import { useMutation } from 'react-query';
import { Button } from '@mui/material';
import ErrorBoundary from '../ErrorBoundary';
import projectSettings from '../../settings';
import { availabilitySelect } from '../optionsSelects/Availability';
import { editPost } from '../../containers/post/api/crud';

const EditPostForm = ({
  post, availabilities, onHandleClose, postEditId,
}) => {
  const mutation = useMutation(
    'edit-post',
    (formData) => editPost(postEditId, formData),
  );

  const postEdit = post
    && {
      text: post.text,
      postAvailabilityId: post.postavailabilityid,
    };

  const schema = Yup.object().shape({
    text: Yup.string().required('Article text is required'),
    postAvailabilityId: Yup.number('Article availability must be number').required('Article availability is required'),
  });

  const onFormSubmit = (dataSubmit, { setSubmitting }) => {
    const onFormData = {
      text: dataSubmit.text,
      postavailabilityid: dataSubmit.postAvailabilityId,
    };

    mutation.mutate(onFormData);

    if (!mutation.isLoading) {
      onHandleClose();
      setSubmitting(false);
    }
  };

  return (
    <ErrorBoundary>
      <Formik
        initialValues={postEdit}
        onSubmit={onFormSubmit}
        validationSchema={schema}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form>
            <Field
              component={TextField}
              type="text"
              name="text"
              label="Post text"
              multiline
              rows={6}
              fullWidth
              style={{
                marginBottom: '30px',
              }}
            />

            {availabilitySelect('postAvailabilityId', 'outlined', availabilities)}

            <div className="modal-footer-block">
              <Button
                variant="text"
                onClick={onHandleClose}
              >
                Close
              </Button>
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                loadingIndicator="Loading..."
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={!(dirty && isValid && !isSubmitting)}
              >
                Save
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </ErrorBoundary>
  );
};

EditPostForm.propTypes = {
  post: PropTypes.shape({}),
  availabilities: PropTypes.arrayOf(
    PropTypes?.shape({
      availabilityid: PropTypes.number.isRequired,
      availability: PropTypes.string.isRequired,
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
