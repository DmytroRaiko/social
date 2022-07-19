import React, { useState, memo } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import { Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import HistoryIcon from '@mui/icons-material/History';
import styleSettings from '../../services/style.settings';
import useAuth from '../../providers/authProvider';
import ProfileAvatar from './ProfileAvatar';

const { menuPaperProps } = styleSettings;

const HeaderChip = memo(() => {
  const { isAuth, user, logoutFn } = useAuth();
  const userData = user?.user;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (isAuth && userData
    && (
    <>
      <Box className="box-chip">
        <Chip
          onClick={handleClick}
          avatar={(
            <ProfileAvatar
              profileId={userData.profileid}
              name={userData.name}
              avatarlink={userData.avatarlink}
            />
          )}
          label={userData.name}
          variant="outlined"
        />
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={menuPaperProps}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <RouterLink
          style={{ color: 'inherit', textDecoration: 'none' }}
          to={`/profile/${userData.profileid}`}
        >
          <MenuItem>
            <Avatar />
            {' '}
            My account
          </MenuItem>
        </RouterLink>

        <RouterLink
          style={{ color: 'inherit', textDecoration: 'none' }}
          to="/history/seen"
        >
          <MenuItem>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            History
          </MenuItem>
        </RouterLink>

        <RouterLink
          style={{ color: 'inherit', textDecoration: 'none' }}
          to="/profiles/"
        >
          <MenuItem>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            Profiles
          </MenuItem>
        </RouterLink>
        <Divider />
        <MenuItem onClick={() => logoutFn()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
    )
  );
});

export default HeaderChip;
