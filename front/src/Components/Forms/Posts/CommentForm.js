import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-mui';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { props, defaultProps } from '../../../Services/PropTypes/CommentProps';

const CommentForm = ({
  onAddComment, replyTo, replyToHandle, comment, handleChange,
}) => {
  const initialValues = {
    commentText: comment.text || '',
  };

  const schema = Yup.object().shape({
    commentText: Yup.string().required(''),
  });

  let label = 'Your message';
  if (replyTo?.profileId) {
    label = `Your reply to ${replyTo.name}`;
  } else if (comment.commentId) {
    label = 'Your comment';
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onAddComment}
      validationSchema={schema}
    >
      {({ isValid, dirty }) => (
        <Form className="flex row center-end">
          <Field
            component={TextField}
            type="text"
            name="commentText"
            label={label}
            placeholder={label}
            variant="standard"
            fullWidth
          />

          {(replyTo.profileId || comment.commentId)
            && (
            <IconButton
              size="small"
              onClick={() => {
                replyToHandle();
                handleChange();
              }}
              sx={{
                marginLeft: '5px',
              }}
            >
              <CloseIcon />
            </IconButton>
            )}

          <Button
            type="submit"
            variant="contained"
            size="small"
            disabled={!(isValid && dirty)}
            sx={{
              marginLeft: '5px',
            }}
          >
            {(replyTo.profileId && 'reply')
              || (comment.commentId && 'save')
              || 'comment'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

CommentForm.propTypes = props;

CommentForm.defaultProps = defaultProps;

export default CommentForm;
