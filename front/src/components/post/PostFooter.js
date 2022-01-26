import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import viewIcon from '../../icons/viewIcon.svg';
import unLikeIcon from '../../icons/likeIcon.svg';
import likeIcon from '../../icons/redLikeIcon.svg';
import commentIcon from '../../icons/commentIcon.svg';

const PostFooter = ({
  postId, postLikes, postComments, totalViews, postMyLike,
}) => (
  <div className="post-footer">
    <div className="footer-item">
      <img src={viewIcon} alt="comments" />
      {totalViews}
    </div>
    <div className="footer-item">
      <img src={postMyLike ? likeIcon : unLikeIcon} alt="likes" />
      {postLikes}
    </div>
    <Link to={`/articles/${postId}/comments`} className="footer-item">
      <img src={commentIcon} alt="comments" />
      {postComments}
    </Link>
  </div>
);

PostFooter.propTypes = {
  postId: PropTypes.number.isRequired,
  totalViews: PropTypes.number,
  postLikes: PropTypes.number,
  postComments: PropTypes.number,
  postMyLike: PropTypes.number,
};

PostFooter.defaultProps = {
  totalViews: 0,
  postLikes: 0,
  postComments: 0,
  postMyLike: 0,
};

export default PostFooter;
