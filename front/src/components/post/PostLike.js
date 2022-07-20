import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Popover, AvatarGroup, IconButton, Link,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ProfileAvatar from '../profile/ProfileAvatar';
import { useSocketLikes } from '../../config/socket.likes';
import LikesModal from '../../containers/modals/LikesModal';

const PostLike = memo(({ userId, postId }) => {
  const {
    likes, countLikes, addLike, deleteLike,
  } = useSocketLikes(`likes-${postId}`, userId);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLikeModal, setOpenLikeModal] = useState(false);

  const myLike = likes.find((el) => el.profileId === userId)?.profileId;

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

  const handleOpen = () => setOpenLikeModal(true);
  const handleClose = () => setOpenLikeModal(false);

  const popover = likes?.map((like) => (
    <div key={`${postId}-like-${like.postLikeId}`}>
      <ProfileAvatar
        profileId={like.profileId}
        name={like.name}
        avatarLink={like.avatarLink}
      />
    </div>
  ));

  return (
    <>
      {(countLikes && (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link
        src=""
        component="button"
        onClick={() => handleOpen()}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        sx={{
          fontSize: '16px',
          outline: 'none !important',
        }}
        aria-haspopup="true"
        color="inherit"
        underline="hover"
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

      <LikesModal handleClose={handleClose} likes={likes} open={openLikeModal} />
    </>
  );
});

PostLike.propTypes = {
  postId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
};

export default PostLike;
