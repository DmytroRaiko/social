import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import commentIcon from '../../services/icons/commentIcon.svg';

const PostFooter = ({
  postId, postLikes, postComments, // postMyLike,
}) => (
  <div className="post-footer">
    <Link to={`/articles/${postId}/comments`} className="footer-item">
      <img src={commentIcon} alt="comments" />
      {postComments}
      {' '}
      comments
    </Link>
    <div className="footer-item">
      {postLikes || ' '}
      <IconButton className="like">
        <FavoriteBorderIcon />
      </IconButton>
    </div>
  </div>
);

PostFooter.propTypes = {
  postId: PropTypes.number.isRequired,
  postLikes: PropTypes.number,
  postComments: PropTypes.number,
  // postMyLike: PropTypes.number,
};

PostFooter.defaultProps = {
  postLikes: 0,
  postComments: 0,
  // postMyLike: 0,
};

export default PostFooter;
