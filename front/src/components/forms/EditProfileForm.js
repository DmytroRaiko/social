/* eslint-disable react/jsx-props-no-spreading */
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
import SaveIcon from '@mui/icons-material/Save';
import ErrorBoundary from '../ErrorBoundary';
import EditProfileFormProps from '../../services/PropTypes/EditProfileFormProps';

const EditProfileForm = ({
  name, email, phone, universities,
  emailsettingid, phonesettingid, universitysettingid,
  availabilities, university,
}) => {
  const profileUniversities = [];
  // eslint-disable-next-line no-console
  console.log(university);

  universities?.map((universityItem) => profileUniversities.push(universityItem.universityid));

  const profileData = {
    name,
    email,
    phone,
    // universities: [1],
    emailsettingid,
    phonesettingid,
    universitysettingid,
  };

  const availabilitySelect = availabilities?.map((availability) => (
    <MenuItem
      key={`availabilities-${availability.availabilityid}`}
      value={availability.availabilityid}
    >
      {availability.availability}
    </MenuItem>
  ));

  const schemaEditProfile = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short')
      .max(256, 'Too Long')
      .required('Profile name is required'),
    email: Yup.string().max(255, 'Too Long').email('Invalid email'),
    phone: Yup.string().max(13, 'Too Long'),
    // universities: Yup.array().of(
    //   Yup.number(),
    // ),
    emailsettingid: Yup.number(),
    phonesettingid: Yup.number(),
    universitysettingid: Yup.number(),
  });

  const onProfileEditFormSubmit = (dataSubmit) => {
    // eslint-disable-next-line no-console
    console.log(dataSubmit);
  };

  return (
    <ErrorBoundary>
      <Formik
        initialValues={profileData}
        onSubmit={onProfileEditFormSubmit}
        validationSchema={schemaEditProfile}
        validateOnBlur={false}
        validateOnChange
      >
        {({
          isSubmitting, dirty, isValid,
        }) => (
          <Form className="profile-page-right-colmn">
            <div className="profile-page-info edit block-shadow">
              <div className="profile-name edit">
                <Field
                  component={TextField}
                  type="text"
                  name="name"
                  label="Name"
                  placeholder="Name"
                  variant="standard"
                  fullWidth
                />
              </div>

              <div className="profile-information item info-item info-item-edit">
                <div className="value">
                  <Field
                    component={TextField}
                    type="text"
                    name="email"
                    label="E-mail"
                    placeholder="E-mail"
                    variant="standard"
                    fullWidth
                  />
                </div>
                <Field
                  component={Select}
                  name="emailsettingid"
                  label="Availability"
                  variant="standard"
                  sx={{
                    width: '150px',
                    height: '30px',
                  }}
                >
                  {availabilitySelect}
                </Field>
              </div>

              <div className="item info-item info-item-edit">
                <div className="value">
                  <Field
                    component={TextField}
                    type="text"
                    name="phone"
                    label="Phone"
                    placeholder="Phone"
                    variant="standard"
                    fullWidth
                  />
                </div>
                <Field
                  component={Select}
                  name="phonesettingid"
                  label="Availability"
                  variant="standard"
                  sx={{
                    width: '150px',
                    height: '30px',
                  }}
                >
                  {availabilitySelect}
                </Field>
              </div>

              <div className="item info-item info-item-edit">
                <div className="values">
                  [Multiple select. Profiles universities]
                </div>
                <Field
                  component={Select}
                  name="universitysettingid"
                  label="Availability"
                  variant="standard"
                  sx={{
                    width: '150px',
                    height: '30px',
                  }}
                >
                  {availabilitySelect}
                </Field>
              </div>

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

EditProfileForm.propTypes = EditProfileFormProps;

EditProfileForm.defaultProps = {
  email: undefined,
  phone: undefined,
  universities: [],
  university: [],
};

export default EditProfileForm;
