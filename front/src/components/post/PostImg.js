import PropTypes from 'prop-types';

const PostImg = ({ postImgSrc, postImgTitle }) => {
  if (postImgSrc !== null) {
    return <p className="post-img"><img src={postImgSrc} title={postImgTitle} alt={postImgTitle} /></p>;
  } return ' ';
};

PostImg.propTypes = {
  postImgSrc: PropTypes.string,
  postImgTitle: PropTypes.string,
};

PostImg.defaultProps = {
  postImgSrc: null,
  postImgTitle: 'Post image',
};

export default PostImg;
