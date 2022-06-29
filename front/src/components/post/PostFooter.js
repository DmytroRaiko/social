import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import commentIcon from '../../services/icons/commentIcon.svg';

const PostFooter = ({
  postId, postProfileId, postLikes, setLikeHandle, postComments, postMyLike,
}) => (
  <div className="post-footer">
    <Button to={`/articles/${postProfileId}/comments`} onClick={() => console.log('collapse block')} className="footer-item">
      <img src={commentIcon} alt="comments" />
      {postComments}
      {' '}
      comments
    </Button>
    <div className="footer-item">
      {postLikes || ' '}
      <IconButton onClick={() => setLikeHandle(postId, Boolean(postMyLike))} className="like" color="error">
        {postMyLike
          ? <FavoriteIcon />
          : <FavoriteBorderIcon />}
      </IconButton>
    </div>
  </div>
);

PostFooter.propTypes = {
  postId: PropTypes.number.isRequired,
  postProfileId: PropTypes.number.isRequired,
  postLikes: PropTypes.number,
  postComments: PropTypes.number,
  postMyLike: PropTypes.bool,
  setLikeHandle: PropTypes.func.isRequired,
};

PostFooter.defaultProps = {
  postLikes: 0,
  postComments: 0,
  postMyLike: false,
};

export default PostFooter;
