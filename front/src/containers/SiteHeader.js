import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AddPostModal from './modals/AddPostModal';
import ErrorBoundary from '../components/ErrorBoundary';
import HeaderChip from '../components/profile/HeaderChip';

const SiteHeader = () => (
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
);
export default SiteHeader;
