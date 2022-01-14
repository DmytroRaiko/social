import PropTypes from 'prop-types';

const PostTime = ({ timePost }) => {
  if (timePost !== null) {
    return (<p className="post-time"><b>{timePost}</b></p>);
  }
  return ' ';
};

PostTime.propTypes = {
  timePost: PropTypes.string,
};

PostTime.defaultProps = {
  timePost: null,
};

export default PostTime;
