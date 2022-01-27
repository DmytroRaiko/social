import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import avatarIcon from '../../icons/avatarIcon.svg';

const PostHeader = ({
  profileId, avatar, postAuthor, parentPostId,
}) => (
  <NavLink to={`/profile/${profileId}`} className={`post-header ${parentPostId}`}>
    <img src={(avatar && `http://localhost:9000/files/avatar/${profileId}`) || avatarIcon} alt="avatar" />
    <div className="author">{postAuthor}</div>
  </NavLink>
);

PostHeader.propTypes = {
  profileId: PropTypes.number.isRequired,
  avatar: PropTypes.string,
  postAuthor: PropTypes.string.isRequired,
  parentPostId: PropTypes.string,
};

PostHeader.defaultProps = {
  avatar: avatarIcon,
  parentPostId: null,
};

export default PostHeader;
