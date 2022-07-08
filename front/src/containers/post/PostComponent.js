import React from 'react';
import { useMutation } from 'react-query';
// import { useI,nView } from 'react-intersection-observer';
import PostHeader from '../../components/post/PostHeader';
import PostFooter from '../../components/post/PostFooter';
import PostContent from '../../components/post/PostContent';

import './Post.css';
import ErrorBoundary from '../../components/ErrorBoundary';
import postComponentProps from '../../services/PropTypes/PostComponentProps';
import postComponentPropsDefault from '../../services/PropTypes/PostComponentPropsDefault';
import { deleteLikePost, likePost } from './api/crud';
import postViewScroll from '../../hooks/postViewScroll';

const PostComponent = ({ posts, setPosts }) => {
  postViewScroll();

  const deleteLike = useMutation(
    'post-like',
    (postId) => deleteLikePost(postId),
  );

  const postLike = useMutation(
    'post-like',
    (postId) => likePost(postId),
  );

  const setLikeHandle = (postId, postLikeId) => {
    let likeTmp;

    if (postLikeId) {
      deleteLike.mutate(postId);

      likeTmp = null;
    } else {
      postLike.mutate(postId);

      likeTmp = true;
    }

    setPosts(posts.map((post) => (post.postid === postId
      ? { ...post, postlikeid: likeTmp }
      : post)));
  };

  const postsList = posts?.map((post) => (
    <div
      className="post-body"
      data-id={post.postid}
      key={`post-id-${post.postid}`}
    >
      <ErrorBoundary>
        <PostHeader
          profileId={post.profileid}
          avatar={post.avatarlink}
          postAuthor={post.name}
          postId={post.postid}
          postEdit={post.changed}
          postTime={post.timepost}
          changeTime={post.timechanged}
        />
        <PostContent
          postId={post.postid}
          postText={post.text}
          postImage={post.imagelink}
        />
        <PostFooter
          postId={post.postid}
          setLikeHandle={setLikeHandle}
        />
      </ErrorBoundary>
    </div>
  ));

  return postsList || <div> There are no any posts here! </div>;
};

PostComponent.propTypes = postComponentProps;

PostComponent.defaultProps = postComponentPropsDefault;

export default PostComponent;
