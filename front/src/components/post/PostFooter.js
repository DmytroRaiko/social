import React from 'react';
import PropTypes from 'prop-types';
import viewIcon from '../../icons/viewIcon.svg';
import likeIcon from '../../icons/likeIcon.svg';
import commentIcon from '../../icons/commentIcon.svg';

const PostFooter = ({ postLikes, postComments, totalViews }) => (
  <div className="post-footer">
    <div className="footer-item">
      <img src={viewIcon} alt="comments" />
      {totalViews}
    </div>
    <div className="footer-item">
      <img src={likeIcon} alt="likes" />
      {postLikes}
    </div>
    <div className="footer-item">
      <img src={commentIcon} alt="comments" />
      {postComments}
    </div>
  </div>
);

PostFooter.propTypes = {
  totalViews: PropTypes.number,
  postLikes: PropTypes.number,
  postComments: PropTypes.number,
};

PostFooter.defaultProps = {
  totalViews: 0,
  postLikes: 0,
  postComments: 0,
};

export default PostFooter;
