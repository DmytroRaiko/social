import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { getSeenPosts } from './api/crud';
import PostMapping from './PostMapping';
import { PostSkeletonLoader } from '../../components/loaders/PostSkeletonLoader';
import './Post.css';

const HistorySeen = () => {
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
        const res = await getSeenPosts(page);
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
    <div className="post-container just-posts-page">
      {posts
         && (
         <PostMapping posts={posts} />
         )}

      <PostSkeletonLoader show={isFetching} count={3} />

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
  );
};

export default HistorySeen;
