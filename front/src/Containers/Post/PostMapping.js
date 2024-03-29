import React from 'react';
import postComponentProps from '../../Services/PropTypes/PostComponentProps';
import postComponentPropsDefault from '../../Services/PropTypes/PostComponentPropsDefault';
import PostComponent from './PostComponent';

import '../../Assets/Styles/Post.css';

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
