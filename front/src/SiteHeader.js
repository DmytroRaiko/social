import React from 'react';
import { Link } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import AddPostModal from './containers/modals/AddPostModal';

const SiteHeader = () => (
  <ErrorBoundary>
    <div className="header-button-block">
      <Link to="/articles">
        Articles
      </Link>
      <AddPostModal />
      <Link to="/profiles">
        Profiles
      </Link>
    </div>
  </ErrorBoundary>
);

export default SiteHeader;
