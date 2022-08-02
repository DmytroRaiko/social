/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import SaveIcon from '@mui/icons-material/Save';
import { useMutation } from 'react-query';
import LoadingButton from '@mui/lab/LoadingButton';
import ErrorBoundary from '../../Services/Errors/ErrorBoundary';
import EditProfileFormProps from '../../Services/PropTypes/EditProfileFormProps';
import MyAutocomplete from '../../Components/FormElements/MyAutocomplete';
import { editProfile } from '../../Services/ CRUD/Profiles';
import { regex, profileAvailabilityStyles } from '../../Config';
import AvailabilitySchema from '../../Services/Schemas/AvailabilitySchema';
import AddUniversityModal from '../Modals/AddUniversityModal';

const EditProfileForm = ({
  profile, availabilities, university,
}) => {
  const [openModalAddUniversity, setOpenMAU] = React.useState({ open: false, data: null });
  const handleOpenMAU = (data) => setOpenMAU({ open: true, data });
  const handleCloseMAU = () => setOpenMAU({ open: false, data: null });

  const mutation = useMutation(
    'edit-profile',
    (formData) => editProfile(profile.profileId, formData),
  );

  // variable for autocomplete
  const profileUniversities = [];
  profile.universities?.map((universityItem) => profileUniversities
    .push({
      value: universityItem.universityId,
      label: universityItem.name,
    }));

  // variable [initial values]
  const profileData = {
    name: profile.name,
    email: profile.email || '',
    phone: profile.phone || '',
    universities: profileUniversities,
    emailSettingId: {
      value: profile.emailSettingId,
      label: profile.emailSetting,
    },
    phoneSettingId: {
      value: profile.phoneSettingId,
      label: profile.phoneSetting,
    },
    universitySettingId: {
      value: profile.universitySettingId,
      label: profile.universitySetting,
    },
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
      .matches(regex?.phone, 'Phone number is not valid'),
    universities: Yup.array()
      .of(
        AvailabilitySchema,
      ),
    emailSettingId: AvailabilitySchema.required('E-mail availability is required'),
    phoneSettingId: AvailabilitySchema.required('Phone availability is required'),
    universitySettingId: AvailabilitySchema.required('Universities availability is required'),
  });

  const onProfileEditFormSubmit = (dataSubmit, { setSubmitting }) => {
    const { email, ...data } = dataSubmit;
    mutation.mutate({
      name: data.name,
      phone: data.phone,
      universities: Array.from(data?.universities, (el) => el?.value),
      emailSettingId: data.emailSettingId.value,
      phoneSettingId: data.phoneSettingId.value,
      universitySettingId: data.universitySettingId.value,
    });

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
                    disabled
                    fullWidth
                  />
                </div>

                <Field
                  component={MyAutocomplete}
                  name="emailSettingId"
                  label="Visible to"
                  options={availabilities}
                  optionLabel={(option) => option.label}
                  optionEqual={(option, value) => option?.label === value?.label}
                  sx={profileAvailabilityStyles}
                />
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
                  component={MyAutocomplete}
                  name="phoneSettingId"
                  label="Visible to"
                  options={availabilities}
                  optionLabel={(option) => option.label}
                  optionEqual={(option, value) => option?.label === value?.label}
                  sx={profileAvailabilityStyles}
                />
              </div>
              <ErrorBoundary>
                <div className="item info-item info-item-edit">
                  <div className="value">

                    <Field
                      component={MyAutocomplete}
                      variant="outlined"
                      name="universities"
                      label="Universities"
                      placeholder="You study at the..."
                      multiple
                      options={university}
                      openModal={handleOpenMAU}
                      optionLabel={(option) => option.label}
                      optionEqual={(option, value) => option?.label === value?.label}
                    />
                  </div>

                  <Field
                    component={MyAutocomplete}
                    className="university-autocomplete"
                    name="universitySettingId"
                    label="Visible to"
                    options={availabilities}
                    optionLabel={(option) => option.label}
                    optionEqual={(option, value) => option?.label === value?.label}
                    sx={profileAvailabilityStyles}
                  />
                </div>
              </ErrorBoundary>

              <div>
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
            </div>
          </Form>
        )}
      </Formik>

      <AddUniversityModal open={openModalAddUniversity} handleClose={handleCloseMAU} />
    </ErrorBoundary>
  );
};

EditProfileForm.propTypes = EditProfileFormProps;

EditProfileForm.defaultProps = {
  email: undefined,
  phone: undefined,
  university: [],
};

export default EditProfileForm;
