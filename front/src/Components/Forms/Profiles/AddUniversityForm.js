import React from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { Button } from '@mui/material';
import * as Yup from 'yup';
import ErrorBoundary from '../../../Services/Errors/ErrorBoundary';
import { addUniversities } from '../../../Services/CRUD/Profiles';
import { buttons, textFieldMessages } from '../../../Services/Constants/index';

const AddUniversityForm = ({ data, handleClose }) => {
  const queryClient = useQueryClient();

  const initialValues = {
    name: data || '',
  };

  const schema = Yup.object().shape({
    name: Yup.string().required(textFieldMessages.requiredField),
  });

  const mutation = useMutation(
    'add-university',
    (formData) => addUniversities(formData),
    {
      onSuccess: () => queryClient.invalidateQueries('universities'),
    },
  );

  const onFormSubmit = (dataSubmit) => {
    mutation.mutate(dataSubmit);

    if (!mutation.isLoading) {
      handleClose();
    }
  };

  return (
    <ErrorBoundary>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={schema}
      >
        {() => (
          <Form>
            <Field
              component={TextField}
              type="text"
              name="name"
              label="University name"
              fullWidth
              variant="standard"
            />

            <div className="modal-footer-block">
              <Button
                variant="text"
                onClick={handleClose}
              >
                {buttons.close}
              </Button>

              <Button
                type="submit"
                variant="contained"
              >
                {buttons.add}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </ErrorBoundary>
  );
};

AddUniversityForm.propTypes = {
  handleClose: PropTypes.func,
};

AddUniversityForm.defaultProps = {
  handleClose: () => {},
};

export default AddUniversityForm;
