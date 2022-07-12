import './Profile.css';
import { useInfiniteQuery } from 'react-query';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { getProfilePosts } from './api/crud';
import { Loader } from '../../components/Loader';
import PostMapping from '../post/PostMapping';

const ProfilePosts = ({ profileId }) => {
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
  }, [profileId]);

  const {
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery(
    `profile-posts-${profileId}`,
    async () => {
      if (inView) {
        const res = await getProfilePosts(profileId, page);
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
  }, [inView, profileId]);

  return (
    <>
      {isFetching && <Loader />}

      {posts && <PostMapping posts={posts} />}

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

ProfilePosts.propTypes = {
  profileId: PropTypes.number.isRequired,
};

export default ProfilePosts;
