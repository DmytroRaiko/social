/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import SaveIcon from '@mui/icons-material/Save';
import { useMutation } from 'react-query';
import LoadingButton from '@mui/lab/LoadingButton';
import ErrorBoundary from '../ErrorBoundary';
import EditProfileFormProps from '../../services/PropTypes/EditProfileFormProps';
import { availabilitySelect } from '../optionsSelects/Availability';
import { editProfile } from '../../containers/profiles/api/crud';

const phoneRegExp = /^[0-9\-\\+]{3,13}$/;

const EditProfileForm = ({
  profile, availabilities,
}) => {
  const mutation = useMutation(
    'edit-profile',
    (formData) => editProfile(profile.profileid, formData),
  );

  // variable for autocomplete
  const profileUniversities = [];
  profile.universities?.map((universityItem) => profileUniversities
    .push(universityItem.universityid));

  // variable [initial values]
  const profileData = {
    name: profile.name,
    email: profile.email || '',
    phone: profile.phone || '',
    emailSettingId: profile.emailsettingid,
    phoneSettingId: profile.phonesettingid,
    universitySettingId: profile.universitysettingid,
  };

  // variable [formik schema]
  const schemaEditProfile = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short')
      .max(256, 'Too Long')
      .required('Profile name is required'),
    email: Yup.string()
      .max(255, 'Too Long')
      .email('Invalid email'),
    phone: Yup.string()
      .min(6, 'Too Short')
      .max(13, 'Too Long')
      .matches(phoneRegExp, 'Phone number is not valid'),

    emailSettingId: Yup.number().required(),
    phoneSettingId: Yup.number().required(),
    universitySettingId: Yup.number().required(),
  });

  const onProfileEditFormSubmit = (dataSubmit, { setSubmitting }) => {
    const onFormData = {
      name: dataSubmit.name,
      email: dataSubmit.email,
      phone: dataSubmit.phone,
    };

    mutation.mutate(onFormData);

    if (!mutation.isLoading) {
      setSubmitting(false);
    } else {
      setSubmitting(true);
    }
  };

  return (
    <ErrorBoundary>
      <Formik
        initialValues={profileData}
        onSubmit={onProfileEditFormSubmit}
        validationSchema={schemaEditProfile}
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
                {availabilitySelect('emailSettingId', 'standard', availabilities)}
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

                {availabilitySelect('phoneSettingId', 'standard', availabilities)}
              </div>

              <div className="item info-item info-item-edit">
                <div className="values">
                  [Multiple select. Profiles universities]
                </div>

                {availabilitySelect('universitySettingId', 'standard', availabilities)}

              </div>

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

EditProfileForm.propTypes = EditProfileFormProps;

EditProfileForm.defaultProps = {
  email: undefined,
  phone: undefined,
  universities: [],
  university: [],
};

export default EditProfileForm;
