import React from 'react';
import CommentForm from '../../components/forms/CommentForm';
import { props, defaultProps } from '../../services/PropTypes/CommentProps';

const AddCommentForm = ({
  replyTo, replyToHandle, comment, handleChange, onAddComment,
}) => (
  <CommentForm
    replyTo={replyTo}
    onAddComment={onAddComment}
    replyToHandle={replyToHandle}
    comment={comment}
    handleChange={handleChange}
  />
);

AddCommentForm.propTypes = props;

AddCommentForm.defaultProps = defaultProps;

export default AddCommentForm;
