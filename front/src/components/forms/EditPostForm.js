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
import SaveIcon from '@mui/icons-material/Save';
import postComponentProps from '../../services/PropTypes/PostComponentProps';
import postComponentPropsDefault from '../../services/PropTypes/PostComponentPropsDefault';
import ErrorBoundary from '../ErrorBoundary';
import { onEditArticleFormSubmit } from '../../handlers/handlers';

const EditPostForm = ({
  posts, availabilities, onHandleClose, postEditId,
}) => {
  const postEdit = posts[0] ? posts[0] : null;

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
  });

  const onFormSubmit = (dataSubmit) => {
    onEditArticleFormSubmit(dataSubmit, postEditId)
      .then(() => onHandleClose())
      // eslint-disable-next-line no-console
      .catch((e) => console.error(e));
  };

  return (
    <ErrorBoundary>
      <Formik
        initialValues={postEdit}
        onSubmit={onFormSubmit}
        validationSchema={schema}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form
            method="put"
            encType="application/x-www-form-urlencoded"
            action={`http://localhost:9000/posts/${postEditId}`}
          >
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
                startIcon={<SaveIcon />}
                disabled={!(dirty && isValid && !isSubmitting)}
              >
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </ErrorBoundary>
  );
};

EditPostForm.propTypes = Object.assign(
  postComponentProps,
  {
    availabilities: PropTypes.arrayOf(
      PropTypes?.shape({
        availabilityid: PropTypes.number.isRequired,
        availability: PropTypes.string.isRequired,
      }),
    ),
    onHandleClose: PropTypes.func,
    postEditId: PropTypes.number,
  },
);

EditPostForm.defaultProps = Object.assign(
  postComponentPropsDefault,
  {
    availabilities: [],
  },
);

export default EditPostForm;
