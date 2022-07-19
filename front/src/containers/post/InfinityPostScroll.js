import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import PostMapping from './PostMapping';
import { PostSkeletonLoader } from '../../components/loaders/PostSkeletonLoader';

const InfinityPostScroll = ({
  query, dependencies, skeletonAmountChilds,
}) => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts([]);
    setLastPage(false);
    setPage(1);
  }, dependencies);

  const {
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery(
    'posts',
    async () => {
      if (inView) {
        const res = await query(page);
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
      {posts
        && (
          <PostMapping posts={posts} />
        )}

      <PostSkeletonLoader show={isFetching} count={skeletonAmountChilds} />

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
    </>
  );
};

InfinityPostScroll.propTypes = {
  query: PropTypes.func.isRequired,
  skeletonAmountChilds: PropTypes.number,
};

InfinityPostScroll.defaultProps = {
  skeletonAmountChilds: 1,
};

export default InfinityPostScroll;
