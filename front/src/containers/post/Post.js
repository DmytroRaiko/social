import './Post.css';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getPost } from './api/crud';
import PostComponent from './PostComponent';
import { PostSkeletonLoader } from '../../components/loaders/PostSkeletonLoader';

const Post = () => {
  const params = useParams();

  if (/^[0-9]*$/m.exec(params.id)) {
    const postId = params.id;

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
