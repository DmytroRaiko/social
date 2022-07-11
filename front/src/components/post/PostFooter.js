import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion, AccordionDetails, AccordionSummary, IconButton, Typography,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Comment from './Comment';
import AddCommentForm from '../../containers/post/forms/AddCommentForm';
import { useSocketComments } from '../../config/socket.comments';
import { useSocketLikes } from '../../config/socket.likes';
import ErrorBoundary from '../ErrorBoundary';
import useAuth from '../../containers/providers/authProvider';

const PostFooter = ({ postId }) => {
  const { user } = useAuth();
  const userId = user?.user?.profileid;
  const {
    comments, addComments, changeComment, deleteComment,
  } = useSocketComments(`comments-${postId}`, userId);

  const {
    likes, addLike, deleteLike,
  } = useSocketLikes(`likes-${postId}`, userId);
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const [replyTo, setReplyTo] = useState({
    profileId: null,
    name: '',
  });
  const [change, setChange] = useState({
    commentId: null,
    text: '',
  });
  const myLike = likes.find((el) => el.profileid === userId);

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

  const handleLike = () => {
    if (myLike) {
      deleteLike();
    } else {
      addLike();
    }
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
              {comments.length}
            </Typography>
          </AccordionSummary>

          <div className="footer-item">
            {likes.length || ' '}
            <IconButton
              onClick={handleLike}
              className="like"
              color="error"
            >
              {myLike
                ? <FavoriteIcon />
                : <FavoriteBorderIcon />}
            </IconButton>
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
                    <div className="comment" key={`post-${comment.postid}-comment-${comment.commentid}`}>
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
};

PostFooter.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default PostFooter;
