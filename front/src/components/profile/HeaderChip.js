import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import { Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import projectSettings from '../../settings';
import stringAvatar from '../../services/icons/avatarIcon';
import context from '../../services/context';
import styleSettings from '../../services/style.settings';

const { menuPaperProps } = styleSettings;

const HeaderChip = () => {
  const { authAccess, userData } = useContext(context);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (authAccess && userData
    && (
    <>
      <Box className="box-chip">
        <Chip
          onClick={handleClick}
          avatar={
            (userData.icon
              && (
                <img
                  className="avatar"
                  src={`${projectSettings.URI}/files/avatar/${userData.id}`}
                  alt="avatar"
                />
              )
            )
            // eslint-disable-next-line react/jsx-props-no-spreading
            || <Avatar {...stringAvatar(userData.name)} />
          }
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
          to={`/profile/${userData.id}`}
        >
          <MenuItem>
            <Avatar />
            {' '}
            My account
          </MenuItem>
        </RouterLink>
        <RouterLink
          style={{ color: 'inherit' }}
          to="/profiles/"
        >
          <MenuItem>
            Profiles
          </MenuItem>
        </RouterLink>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
    )
  );
};

export default HeaderChip;
