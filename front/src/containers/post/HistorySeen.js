import React from 'react';
import { getSeenPosts } from './api/crud';
import './Post.css';
import InfinityPostScroll from './InfinityPostScroll';

const HistorySeen = () => (
  <div className="post-container just-posts-page">
    <InfinityPostScroll
      query={(page) => getSeenPosts(page)}
      dependencies={[]}
      skeletonAmountChilds={3}
    />
  </div>
);

export default HistorySeen;
