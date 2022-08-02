import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion, AccordionDetails, AccordionSummary, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import Comment from '../../Components/Post/Comment';
import AddCommentForm from '../Forms/AddCommentForm';
import { useSocketComments } from '../../Config/Sockets/socket.comments';
import ErrorBoundary from '../../Services/Errors/ErrorBoundary';
import useAuth from '../../Services/Providers/authProvider';
import PostLike from '../../Components/Post/PostLike';

const PostFooter = memo(({ postId }) => {
  const { user } = useAuth();
  const userId = user?.user?.profileId;
  const params = useParams();
  const { postId: paramId } = params;
  const {
    comments, countComments, addComments, changeComment, deleteComment,
  } = useSocketComments(`comments-${postId}`, userId);

  const [expandedAccordion, setExpandedAccordion] = useState(paramId ? 'panel1' : null);
  const [replyTo, setReplyTo] = useState({
    profileId: null,
    name: '',
  });
  const [change, setChange] = useState({
    commentId: null,
    text: '',
  });

  const handleSetReplyTo = (profileId = null, name = '') => {
    setReplyTo({ profileId, name });
  };

  const handleSetChange = (commentId = null, text = '') => {
    setChange({ commentId, text });
  };

  const handleOpenAccordion = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const onAddComment = (dataForm, { resetForm }) => {
    if (change?.commentId) {
      changeComment(
        {
          commentId: change.commentId,
          text: dataForm.commentText,
        },
      );
    } else {
      addComments(
        {
          text: dataForm.commentText,
          parentProfileId: replyTo?.profileId || null,
          postId,
        },
      );
    }
    handleSetReplyTo();
    handleSetChange();
    resetForm();
  };

  const onDeleteHandle = (id) => {
    deleteComment(id);
  };

  return (
    <div className="post-footer">
      <Accordion
        sx={{
          boxShadow: 'none',
          width: '100%',
        }}
        expanded={expandedAccordion === 'panel1'}
        onChange={handleOpenAccordion('panel1')}
      >
        <div className="action-row">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              width: '50%',
            }}
          >
            <Typography>
              Comments
              {' '}
              {countComments}
            </Typography>
          </AccordionSummary>

          <div className="footer-item">
            <PostLike postId={postId} userId={userId} />
          </div>
        </div>

        <AccordionDetails
          className="comment-block"
          sx={{ padding: '1px 0 16px' }}
        >
          {comments
            && (
              <ErrorBoundary>
                <div className="comments flex column">
                  {comments?.map((comment) => (
                    <div className="comment" key={`post-${comment.postId}-comment-${comment.commentId}`}>
                      <Comment
                        handleChange={handleSetChange}
                        comment={comment}
                        replyToHandle={handleSetReplyTo}
                        onDeleteHandle={onDeleteHandle}
                        userId={userId}
                      />
                    </div>
                  ))}
                </div>
              </ErrorBoundary>
            )}

          <AddCommentForm
            replyTo={replyTo}
            replyToHandle={handleSetReplyTo}
            comment={change}
            handleChange={handleSetChange}
            onAddComment={onAddComment}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
});

PostFooter.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default PostFooter;
