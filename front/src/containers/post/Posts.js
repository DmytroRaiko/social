import React from 'react';
import { getPosts } from './api/crud';
import './Post.css';
import InfinityPostScroll from './InfinityPostScroll';

const Posts = () => (
  <div className="post-container">
    <InfinityPostScroll
      query={(page) => getPosts(page)}
      skeletonAmountChilds={3}
      dependencies={[]}
    />
  </div>
);

export default Posts;
