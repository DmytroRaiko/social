import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { PostSkeletonLoader } from '../../Layouts/Loaders/PostSkeletonLoader';
import PostComponent from '../../Containers/Post/PostComponent';
import { getPost } from '../../Services/ CRUD/Posts';

import '../../Assets/Styles/Post.css';

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
