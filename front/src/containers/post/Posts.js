import './Post.css';
import { useQuery } from 'react-query';
import { getPosts } from './api/crud';
import PostComponent from './PostComponent';
import { Loader } from '../../components/Loader';

const Posts = () => {
  const {
    isFetching,
    refetch,
    data,
  } = useQuery(
    'posts',
    () => getPosts(),
  );
  const posts = data?.data.data;

  return (
    <>
      {isFetching && <Loader />}
      {data && <PostComponent posts={posts} refetch={refetch} />}
    </>
  );
};

export default Posts;
