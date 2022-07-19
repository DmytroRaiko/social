import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popover, AvatarGroup } from '@mui/material';
import ProfileAvatar from '../profile/ProfileAvatar';

const LikePopover = memo(({ countLikes, likes, postId }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const popover = likes?.map((like) => (
    <div key={`${postId}-like-${like.postlikeid}`}>
      <ProfileAvatar
        profileId={like.profileid}
        name={like.name}
        avatarlink={like.avatarlink}
      />
    </div>
  ));

  return (countLikes && (
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
  )) || null;
});

LikePopover.propTypes = {
  countLikes: PropTypes.number,
  postId: PropTypes.number.isRequired,
  likes: PropTypes.oneOfType(
    [
      PropTypes.arrayOf(PropTypes.shape({})),
      PropTypes.instanceOf(null),
    ],
  ),
};

LikePopover.defaultProps = {
  countLikes: 0,
  likes: null,
};

export default LikePopover;
