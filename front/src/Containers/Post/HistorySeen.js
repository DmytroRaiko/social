import React from 'react';
import { getSeenPosts } from '../../Services/ CRUD/Posts';
import '../../Assets/Styles/Post.css';
import InfinityPostScroll from '../../Layouts/InfinityPost/InfinityPostScroll';

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
