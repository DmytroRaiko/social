import React from 'react';
import PropTypes from 'prop-types';
import Post from './post/Post';
import AddArticle from '../components/AddArticle';
import Profile from '../components/Profile';

const Body = ({ viewBLock }) => {
  if (viewBLock === 'article') {
    return (
      <div className="site-body post">
        <Post />
      </div>
    );
  } if (viewBLock === 'articleAdd') {
    return (
      <div className="site-body post-add">
        <AddArticle />
      </div>
    );
  } if (viewBLock === 'profile') {
    return (
      <div className="site-body profile">
        <Profile />
      </div>
    );
  }

  return (
    <div className="site-body">
      <h1>
        There is no such module yet)
        Choose another!
      </h1>
    </div>
  );
};

Body.propTypes = {
  viewBLock: PropTypes.string.isRequired,
};

export default Body;
