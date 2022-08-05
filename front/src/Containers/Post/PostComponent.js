import React, { memo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';
import ErrorBoundary from '../../Services/Errors/ErrorBoundary';
import { viewPost } from '../../Services/CRUD/Posts';
import PostHeader from '../../Components/Post/PostHeader';
import PostFooter from './PostFooter';
import PostContent from '../../Components/Post/PostContent';

import '../../Assets/Styles/Post.css';

const PostComponent = memo(({ post }) => {
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const viewPostQuery = useMutation(
    'view-post',
    (id) => viewPost(id),
  );

  useEffect(() => {
    if (inView) {
      viewPostQuery.mutate(entry?.target.dataset.id);
    }
  }, [inView]);

  return (
    <ErrorBoundary>
      <div
        data-id={post.postId}
        ref={ref}
      />
      <PostHeader
        profileId={post.profileId}
        avatar={post.avatarLink}
        postAuthor={post.name}
        postId={post.postId}
        postEdit={post.changed}
        postTime={post.timePost}
        changeTime={post.timeChanged}
      />
      <PostContent
        postId={post.postId}
        postText={post.text}
        postImage={post.imageLink}
      />
      <PostFooter
        postId={post.postId}
      />
    </ErrorBoundary>
  );
});

PostComponent.propTypes = {
  post: PropTypes.shape({}).isRequired,
};

export default PostComponent;
