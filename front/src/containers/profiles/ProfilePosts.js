import './Profile.css';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { getProfilePosts } from './api/crud';
import PostComponent from '../post/PostComponent';

const ProfilePosts = ({ profileId }) => {
  const {
    isFetching,
    /* refetch, */
    data,
  } = useQuery(
    `profile-post-${profileId}`,
    () => getProfilePosts(profileId),
  );
  const posts = data?.data.data;

  return (
    <>
      {isFetching && <div>Loading...</div>}
      <PostComponent posts={posts} profilePage />
    </>
  );
};

ProfilePosts.propTypes = {
  profileId: PropTypes.number.isRequired,
};

export default ProfilePosts;
