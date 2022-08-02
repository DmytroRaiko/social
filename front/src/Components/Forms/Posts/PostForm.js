import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { Button } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import React from 'react';
import * as Yup from 'yup';
import ImageLoadPost from '../../FormElements/ImageLoadPost';
import MyAutocomplete from '../../FormElements/MyAutocomplete';
import projectSettings from '../../../Config';
import AvailabilitySchema from '../../../Services/Schemas/AvailabilitySchema';

const PostForm = ({
  initialValues, onFormSubmit,
  availabilities, image, setImage,
  onHandleClose, setLoadedPhoto,
}) => {
  const onDeletePhoto = () => {
    setImage(null);
    setLoadedPhoto(null);
  };

  const schema = Yup.object().shape({
    text: Yup.string().required('Article text is required'),
    postAvailabilityId: AvailabilitySchema.required('Article availability is required'),
  });

  const onAttachPhoto = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setLoadedPhoto(file);

    if (file.type.match('image.*')) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        setImage(fileReader.result);
      };
      fileReader.readAsDataURL(file);
      e.target.value = null;
    } else {
      // eslint-disable-next-line no-console
      console.error('Wrong file format');
    }
  };

  return (
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
            name="text"
            label="Post text"
            multiline
            rows={6}
            fullWidth
          />

          <div className="modal-footer-block">
            <Field
              component={MyAutocomplete}
              variant="outlined"
              name="postAvailabilityId"
              label="Visible to"
              options={availabilities}
              optionLabel={(option) => option.label}
              optionEqual={(option, value) => option?.label === value?.label}
              sx={projectSettings.postAvailabilityStyles}
            />

            <ImageLoadPost
              image={image}
              onDeletePhoto={onDeletePhoto}
              onAttachPhoto={onAttachPhoto}
            />
          </div>

          <div className="modal-footer-block">
            <Button
              variant="text"
              onClick={onHandleClose}
              color="error"
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<PublishIcon />}
            >
              Publish
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;
