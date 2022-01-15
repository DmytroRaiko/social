import postImgProps from '../../PropTypes/PostImgProps';
import postImgPropsDefault from '../../PropTypes/PostImgPropsDefault';

const PostImg = ({ postImgSrc, postImgTitle }) => {
  if (postImgSrc !== null) {
    return <p className="post-img"><img src={postImgSrc} title={postImgTitle} alt={postImgTitle} /></p>;
  } return ' ';
};

PostImg.propTypes = postImgProps;

PostImg.defaultProps = postImgPropsDefault;

export default PostImg;
