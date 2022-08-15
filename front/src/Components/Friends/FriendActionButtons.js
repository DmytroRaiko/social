/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Button, ButtonGroup, Grow, MenuItem, MenuList, Paper, Popper,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import useAuth from '../../Services/Providers/authProvider';
import {
  acceptRequest,
  checkFriendly,
  deleteRequest,
  revokeRequest,
  sendRequest,
  deleteFriend,
  banOrUnban,
} from '../../Services/CRUD/Friends';
import { buttons } from '../../Services/Constants';

const FriendActionButtons = ({ profile, profileId, showButtons }) => {
  const { user } = useAuth();
  // 1 - just add friend, 2 - i requested, 3 - i should answer
  const [action, setAction] = React.useState(1);
  const [friendly, setFriendly] = React.useState();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  if (user?.user?.profileId === profile?.profileId
    || user?.user?.profileId === profileId) return null;

  const { mutate } = useMutation(`friendly-${profileId}`, () => checkFriendly(profileId || profile.profileId), {
    onSuccess: (data) => { setFriendly(data?.data?.data); if (!data?.data?.data) setAction(1); },
  });

  React.useEffect(() => {
    const controller = new AbortController();
    setFriendly(profile);
    if (profile) {
      setFriendly(profile);
    } else {
      mutate();
    }

    return () => controller.abort();
  }, [profile]);

  React.useEffect(() => {
    if (user.user.profileId === friendly?.requestUserId) {
      setAction(2);
      // I requested
    } else if (user.user.profileId === friendly?.respondUserId) {
      setAction(3);
      // I should answer
    }
  }, [friendly, user?.user]);

  const addRequest = useMutation('request-send', (data) => sendRequest(data), {
    onSuccess: (data) => {
      setFriendly({ friendId: data?.data?.data });
      setAction(2);
    },
  });
  const { mutate: acceptQuery } = useMutation('request-accept', (id) => acceptRequest(id), {
    onSuccess: () => { mutate(); },
  });
  const { mutate: revokeQuery } = useMutation('request-revoke', (id) => revokeRequest(id), {
    onSuccess: () => { mutate(); },
  });
  const { mutate: deleteQuery } = useMutation('request-delete', (id) => deleteRequest(id), {
    onSuccess: () => { setAction(1); mutate(); },
  });
  const { mutate: deleteFriendQuery } = useMutation('friend-delete', (id) => deleteFriend(id), {
    onSuccess: () => { setAction(1); mutate(); },
  });
  const { mutate: banOrUnbanUser } = useMutation('ban-or-unban', (data) => banOrUnban(data.data, data.type), {
    onSuccess: () => { mutate(); },
  });

  const handleAddRequest = (userId) => {
    addRequest.mutate({ profileId: userId });
  };

  const handleAcceptQuery = (friendId) => {
    acceptQuery(friendId);
  };

  const handleRevokeQuery = (friendId) => {
    revokeQuery(friendId);
  };

  const handleDeleteQuery = (friendId) => {
    deleteQuery(friendId);
  };

  const handleMenuItemClick = (type, friendId = null) => {
    switch (type) {
      case 'ban':
        banOrUnbanUser({ data: { profileId }, type });
        break;
      case 'friend-':
        deleteFriendQuery(friendId);
        break;
      case 'unban':
        banOrUnbanUser({ data: { profileId }, type });
        break;
      case 'friend+':
        acceptQuery(friendId);
        break;
      default: break;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  if (friendly?.role === 'Friends') {
    return (
      <>
        <ButtonGroup variant="text" ref={anchorRef} aria-label="split button">
          {showButtons
            && (
            <Button
              disabled
              variant="contained"
              size="small"
            >
              {buttons.friend}
            </Button>
            )}

          <Button
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <MoreVertIcon />
          </Button>
        </ButtonGroup>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          style={{ zIndex: 50 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    <MenuItem onClick={() => handleMenuItemClick('ban', profileId)}>
                      {buttons.ban}
                    </MenuItem>

                    <MenuItem onClick={() => handleMenuItemClick('friend-', friendly?.friendId)}>
                      {buttons.removeFriend}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  } if (friendly?.role === 'Blocked') {
    return (
      <>
        <ButtonGroup variant="text" ref={anchorRef} aria-label="split button">
          {showButtons
            && (
            <Button
              disabled
              variant="contained"
              size="small"
            >
              {buttons.banned}
            </Button>
            )}

          <Button
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <MoreVertIcon />
          </Button>
        </ButtonGroup>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          style={{ zIndex: 50 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
              placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    <MenuItem onClick={() => handleMenuItemClick('unban', profileId)}>
                      {buttons.unban}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  } if (friendly?.role === 'Subscriber') {
    return (
      <>
        <ButtonGroup variant="text" ref={anchorRef} aria-label="split button">
          {showButtons
            && (
            <Button
              disabled
              variant="contained"
              size="small"
            >
              {buttons.subscriber}
            </Button>
            )}

          <Button
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <MoreVertIcon />
          </Button>
        </ButtonGroup>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          style={{ zIndex: 50 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
              placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    <MenuItem onClick={() => handleMenuItemClick('ban', profileId)}>
                      {buttons.ban}
                    </MenuItem>

                    <MenuItem onClick={() => handleMenuItemClick('friend+', friendly?.friendId)}>
                      {buttons.acceptFriend}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  }

  if (!action) return null;

  return (
    <div className="action-btns">
      {action === 1
        && (
          <Button
            variant="contained"
            size="small"
            onClick={() => handleAddRequest(profile?.profileId || profileId)}
            endIcon={<AddRoundedIcon />}
          >
            {buttons.add}
          </Button>
        )}

      {action === 2
        && (
          <Button
            color="error"
            variant="outlined"
            size="small"
            onClick={() => handleDeleteQuery(friendly.friendId)}
          >
            <CloseRoundedIcon />
          </Button>
        )}

      {action === 3
        && (
          <>
            <Button
              color="success"
              variant="outlined"
              size="small"
              onClick={() => handleAcceptQuery(friendly.friendId)}
            >
              <CheckRoundedIcon />
            </Button>
            <Button
              color="error"
              variant="outlined"
              size="small"
              onClick={() => handleRevokeQuery(friendly.friendId)}
            >
              <CloseRoundedIcon />
            </Button>
          </>
        )}
    </div>
  );
};

FriendActionButtons.propTypes = {
  showButtons: PropTypes.bool,
  profile: PropTypes.shape({}),
  profileId: PropTypes.number,
};

FriendActionButtons.defaultProps = {
  showButtons: true,
  profile: null,
  profileId: null,
};

export default FriendActionButtons;
