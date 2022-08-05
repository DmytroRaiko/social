import React from 'react';
import { getPosts } from '../../Services/CRUD/Posts';
import '../../Assets/Styles/Post.css';
import InfinityPostScroll from '../../Layouts/InfinityPost/InfinityPostScroll';

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
