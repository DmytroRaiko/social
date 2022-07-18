import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  Avatar, Button, Divider, IconButton, Menu, MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useMutation } from 'react-query';
import TimeAgo from 'react-timeago';
import stringAvatar from '../../services/icons/avatarIcon';
import EditPostModal from '../../containers/modals/EditPostModal';
import settings from '../../settings';
import { deletePost } from '../../containers/post/api/crud';
import useAuth from '../../containers/providers/authProvider';

const ITEM_HEIGHT = 48;

const PostHeader = memo(({
  profileId, avatar, postAuthor,
  postId,
  postEdit, postTime, changeTime,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useAuth();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const mutation = useMutation(
    'delete-post',
    () => deletePost(postId),
  );

  const onDeleteHandle = () => {
    mutation.mutate();
  };

  return (
    <div className="post-header">
      <NavLink to={`/profile/${profileId}`}>
        {(avatar
        && (
        <img
          className="avatar"
          src={`${settings.URI}/files/avatar/${profileId}`}
          alt="avatar"
        />
        )
        )
      // eslint-disable-next-line react/jsx-props-no-spreading
      || <Avatar className="post-img" {...stringAvatar(postAuthor)} />}
        <div className="post-header-information">
          <div className="author">{postAuthor}</div>
          <div className="post-footer-time">
            <p className="post-time">
              <TimeAgo date={postTime} />
            </p>

            {postEdit && (
              <p className="post-edit" title={changeTime}>
                {'  '}
                (edited)
              </p>
            )}
          </div>
        </div>
      </NavLink>

      {user?.user?.profileid === profileId
        && (
          <>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              <EditPostModal id={postId} />
              <Divider />
              <MenuItem
                component={Button}
                onClick={onDeleteHandle}
                sx={{
                  width: '100%',
                  textTransform: 'capitalize',
                }}
              >
                <DeleteOutlineOutlinedIcon
                  style={{ marginRight: '10px' }}
                />
                Remove
              </MenuItem>
            </Menu>
          </>
        )}
    </div>
  );
});

PostHeader.propTypes = {
  profileId: PropTypes.number.isRequired,
  avatar: PropTypes.string,
  postAuthor: PropTypes.string.isRequired,
  avatarLink: PropTypes.string,
  postId: PropTypes.number.isRequired,
  postEdit: PropTypes.bool,
  changeTime: PropTypes.string,
  postTime: PropTypes.string.isRequired,
};

PostHeader.defaultProps = {
  avatar: null,
  postEdit: 0,
  changeTime: null,
};

export default PostHeader;
