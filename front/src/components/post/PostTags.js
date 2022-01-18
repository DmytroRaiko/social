import PropTypes from 'prop-types';

const PostTags = ({ tags }) => {
  if (tags !== null) {
    return <p className="post-tags">{tags}</p>;
  }
  return ' ';
};

PostTags.propTypes = {
  tags: PropTypes.string,
};

PostTags.defaultProps = {
  tags: null,
};

export default PostTags;
