import { useState } from 'react';
import { useMutation } from 'react-query';
import PostHeader from '../../components/post/PostHeader';
import PostFooter from '../../components/post/PostFooter';
import PostContent from '../../components/post/PostContent';

import './Post.css';
import ErrorBoundary from '../../components/ErrorBoundary';
import postComponentProps from '../../services/PropTypes/PostComponentProps';
import postComponentPropsDefault from '../../services/PropTypes/PostComponentPropsDefault';
import { deleteLikePost, likePost } from './api/crud';

const PostComponent = ({ posts, refetch }) => {
  const [postList, setPostList] = useState(posts);

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

    setPostList(postList.map((post) => (post.postid === postId
      ? { ...post, postlikeid: likeTmp }
      : post)));
  };

  const postsList = postList?.map((post) => (
    <div className="post-body" key={`post-id-${post.postid}`}>
      <ErrorBoundary>
        <PostHeader
          profileId={post.profileid}
          avatar={post.avatarlink}
          postAuthor={post.name}
          postId={post.postid}
          refetchQuery={refetch}
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
          postProfileId={post.profileid}
          postLikes={post.totallikes}
          setLikeHandle={setLikeHandle}
          postComments={post.totalcomments}
          postMyLike={Boolean(post.postlikeid)}
        />
      </ErrorBoundary>
    </div>
  ));

  return postsList || <div> There are no any posts here! </div>;
};

PostComponent.propTypes = postComponentProps;

PostComponent.defaultProps = postComponentPropsDefault;

export default PostComponent;
