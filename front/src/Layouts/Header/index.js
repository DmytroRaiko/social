import React, { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AddPostModal from '../../Containers/Modals/AddPostModal';
import ErrorBoundary from '../../Services/Errors/ErrorBoundary';
import HeaderChip from '../../Components/Profile/HeaderChip';

const Index = memo(() => (
  <ErrorBoundary>
    <header className="site-header">
      <RouterLink to="/articles">
        Articles
      </RouterLink>
      <div className="header-button-block">
        <AddPostModal />
      </div>
      <HeaderChip />
    </header>
  </ErrorBoundary>
));

export default Index;
