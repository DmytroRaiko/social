import React from 'react';
import Post from './post/Post';
import AddArticle from '../components/AddArticle';
import Profile from '../components/Profile';

function Body({ viewBLock }) {
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
}

export default Body;
