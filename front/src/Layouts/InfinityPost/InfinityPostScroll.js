import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import PostMapping from '../../Containers/Post/PostMapping';
import { PostSkeletonLoader } from '../Loaders/PostSkeletonLoader';

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
    const controller = new AbortController();
    if (inView) {
      fetchNextPage({
        pageParam: page,
      });
    }

    return () => controller.abort();
  }, [inView]);

  return (
    <>
      {(!isFetching && !posts.length && lastPage)
        && (
        <h3 style={{ marginTop: '30px' }}>
          <span style={{ marginRight: '10px' }}>&#9989;</span>
          You have viewed all posts
        </h3>
        )}

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
