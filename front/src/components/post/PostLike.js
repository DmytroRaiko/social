import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popover, AvatarGroup, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ProfileAvatar from '../profile/ProfileAvatar';
import { useSocketLikes } from '../../config/socket.likes';

const PostLike = memo(({ userId, postId }) => {
  const {
    likes, countLikes, addLike, deleteLike,
  } = useSocketLikes(`likes-${postId}`, userId);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const myLike = likes.find((el) => el.profileid === userId)?.profileid;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleLike = () => {
    if (myLike) {
      deleteLike();
    } else {
      addLike();
    }
  };

  const popover = likes?.map((like) => (
    <div key={`${postId}-like-${like.postlikeid}`}>
      <ProfileAvatar
        profileId={like.profileid}
        name={like.name}
        avatarlink={like.avatarlink}
      />
    </div>
  ));

  return (
    <>
      {(countLikes && (
      <Link
        to={`/post/${postId}/likes`}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {countLikes || ''}

        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          className="like-popover"
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <AvatarGroup max={5}>
            {popover}
          </AvatarGroup>
        </Popover>
      </Link>
      )) || null}
      <IconButton
        onClick={handleLike}
        className="like"
        color="error"
      >
        {myLike
          ? <FavoriteIcon />
          : <FavoriteBorderIcon />}
      </IconButton>
    </>
  );
});

PostLike.propTypes = {
  postId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
};

export default PostLike;
