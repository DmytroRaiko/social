import './Post.css';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getPost } from './api/crud';
import PostComponent from './PostComponent';
import { Loader } from '../../components/Loader';

const Post = () => {
  const params = useParams();

  if (/^[0-9]*$/m.exec(params.id)) {
    const postId = params.id;

    const { isFetching, refetch, data } = useQuery(`post-${postId}`, () => getPost(postId));
    const posts = data?.data.data;

    return (
      <>
        {isFetching && <Loader />}
        {posts && <PostComponent posts={posts} refetch={refetch} />}
      </>
    );
  }

  return <div>Error id</div>;
};

export default Post;
