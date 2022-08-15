import React from 'react';
import { getSeenPosts } from '../../Services/CRUD/Posts';
import '../../Assets/Styles/Post.css';
import InfinityPostScroll from '../../Layouts/InfinityPost/InfinityPostScroll';
import ProfilesLayout from '../../Layouts/Profiles';

const HistorySeen = () => (
  <div className="post-container just-posts-page">
    <ProfilesLayout title="History">
      <InfinityPostScroll
        query={(page) => getSeenPosts(page)}
        dependencies={[]}
        skeletonAmountChilds={3}
      />
    </ProfilesLayout>
  </div>
);

export default HistorySeen;
