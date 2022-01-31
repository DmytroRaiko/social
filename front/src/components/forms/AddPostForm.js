import React from 'react';
import {
  Formik, Form, Field,
} from 'formik';
import {
  TextField,
  Select,
} from 'formik-mui';
import {
  Button, MenuItem,
} from '@mui/material';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import PublishIcon from '@mui/icons-material/Publish';
import ErrorBoundary from '../ErrorBoundary';
import { onAddArticleFormSubmit } from '../../handlers/handlers';

const AddPostForm = ({ availabilities, onHandleClose, refetch }) => {
  const availabilitySelect = availabilities?.map((availability) => (
    <MenuItem
      key={`availabilities-${availability.availabilityid}`}
      value={availability.availabilityid}
    >
      {availability.availability}
    </MenuItem>
  ));

  const schema = Yup.object().shape({
    text: Yup.string().required('Article text is required'),
    postavailabilityid: Yup.number('Article availability must be number').required('Article availability is required'),
  });

  const onFormSubmit = (dataSubmit) => {
    onAddArticleFormSubmit(dataSubmit)
      .then(() => {
        onHandleClose();
        refetch();
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.error(e));
  };

  return (
    <ErrorBoundary>
      <Formik
        initialValues={{
          postavailabilityid: 1,
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

            <Field
              component={Select}
              name="postavailabilityid"
              label="Availability"
              sx={{
                width: '250px',
                height: '40px',
              }}
            >
              {availabilitySelect}
            </Field>

            <div className="modal-footer-block">
              <Button
                variant="text"
                onClick={onHandleClose}
              >
                Close
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<PublishIcon />}
                disabled={!(dirty && isValid && !isSubmitting)}
              >
                Publish
              </Button>
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
