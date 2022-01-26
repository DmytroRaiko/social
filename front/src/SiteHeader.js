import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

const SiteHeader = ({ blocks }) => {
  const headerButton = blocks.map((block) => (
    <Link
      key={block.path}
      to={`/${block.path}`}
    >
      {block.title}
    </Link>
  ));

  return (
    <ErrorBoundary>
      <div className="header-button-block">
        {headerButton}
      </div>
    </ErrorBoundary>
  );
};

SiteHeader.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default SiteHeader;
