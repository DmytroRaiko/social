import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../../Assets/Styles/Profiles.css';
import PropTypes from 'prop-types';

const ProfilesLayout = ({ title, children, endActions }) => {
  const navigate = useNavigate();

  const historyGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <header className="profiles-header">
        <IconButton
          sx={{ marginRight: '15px' }}
          onClick={historyGoBack}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography sx={{ width: '100%' }} variant="h5">
          {title}
        </Typography>

        {endActions}
      </header>

      {children}
    </>
  );
};

ProfilesLayout.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  endActions: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

ProfilesLayout.defaultProps = {
  title: '',
};

export default ProfilesLayout;
