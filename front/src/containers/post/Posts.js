import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { getPosts } from './api/crud';
import PostMapping from './PostMapping';
import { Loader } from '../../components/Loader';
import './Post.css';

const Posts = () => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
  });
  const [posts, setPosts] = useState([]);

  const {
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery(
    'posts',
    async () => {
      if (inView) {
        const res = await getPosts(page);
        if (res.status === 200) {
          setPage((prevState) => prevState + 1);
          // eslint-disable-next-line no-unsafe-optional-chaining
          return setPosts((prevState) => [...prevState, ...res?.data?.data]);
        }
        return setLastPage(true);
      }
      return 0;
    },
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage({
        pageParam: page,
      });
    }
  }, [inView]);

  return (
    <>
      {isFetching && <Loader />}
      <div className="post-container">
        {posts
         && (
         <PostMapping posts={posts} />
         )}

        {!lastPage && !isFetching
          && (
          <div
            className="load-more"
            ref={ref}
            style={{
              marginTop: 50,
            }}
          >
            <span style={{ marginRight: '10px' }}>&#129488;</span>
            Load more...
          </div>
          )}
      </div>
    </>
  );
};

export default Posts;
