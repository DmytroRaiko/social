import './Profile.css';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { getProfilePosts } from './api/crud';
import PostComponent from '../post/PostComponent';
import { Loader } from '../../components/Loader';

const ProfilePosts = ({ profileId }) => {
  const {
    isFetching,
    refetch,
    data,
  } = useQuery(
    `profile-post-${profileId}`,
    () => getProfilePosts(profileId),
  );
  const posts = data?.data.data;

  return (
    <>
      {isFetching && <Loader />}
      {data && <PostComponent posts={posts} refetch={refetch} />}
    </>
  );
};

ProfilePosts.propTypes = {
  profileId: PropTypes.number.isRequired,
};

export default ProfilePosts;
