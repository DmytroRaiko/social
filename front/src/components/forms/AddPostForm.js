import React from 'react';
import {
  Formik, Form, Field,
} from 'formik';
import {
  TextField,
} from 'formik-mui';
import {
  Button,
} from '@mui/material';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import PublishIcon from '@mui/icons-material/Publish';
import { useMutation } from 'react-query';
import LoadingButton from '@mui/lab/LoadingButton';
import ErrorBoundary from '../ErrorBoundary';
import projectSettings from '../../settings';
import { availabilitySelect } from '../optionsSelects/Availability';
import { addPost } from '../../containers/post/api/crud';

const AddPostForm = ({ availabilities, onHandleClose }) => {
  const mutation = useMutation(
    'edit-post',
    (formData) => addPost(formData),
  );

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
        initialValues={{
          text: '',
          postAvailabilityId: projectSettings.availability,
        }}
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
                startIcon={<PublishIcon />}
                disabled={!(dirty && isValid && !isSubmitting)}
              >
                Publish
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </ErrorBoundary>
  );
};

AddPostForm.propTypes = {
  availabilities: PropTypes.arrayOf(
    PropTypes?.shape({
      availabilityid: PropTypes.number.isRequired,
      availability: PropTypes.string.isRequired,
    }),
  ),
  onHandleClose: PropTypes.func,
};

AddPostForm.defaultProps = {
  availabilities: [],
};

export default AddPostForm;
