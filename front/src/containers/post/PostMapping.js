import React from 'react';
import postComponentProps from '../../services/PropTypes/PostComponentProps';
import postComponentPropsDefault from '../../services/PropTypes/PostComponentPropsDefault';
import PostComponent from './PostComponent';

import './Post.css';

const PostMapping = ({ posts }) => {
  const postsList = posts?.map((post) => (
    <div
      className="post-body"
      key={`post-id-${post.postId}`}
    >
      <PostComponent post={post} />
    </div>
  ));

  return postsList || <div> There are no any posts here! </div>;
};

PostMapping.propTypes = postComponentProps;

PostMapping.defaultProps = postComponentPropsDefault;

export default PostMapping;
