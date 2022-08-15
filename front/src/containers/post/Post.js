import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { PostSkeletonLoader } from '../../components/loaders/PostSkeletonLoader';
import PostComponent from './PostComponent';
import { getPost } from './api/crud';

import './Post.css';

const Post = () => {
  const params = useParams();

  if (/^[0-9]*$/m.exec(params.postId)) {
    const { postId } = params;

    const { isFetching, data } = useQuery(`post-${postId}`, () => getPost(postId));
    const post = data?.data.data;

    return (
      <>
        <PostSkeletonLoader show={isFetching} />

        {post
          && (
          <div
            className="post-body"
          >
            <PostComponent post={post} />
          </div>
          )}
      </>
    );
  }

  return <div>Error id</div>;
};

export default Post;
