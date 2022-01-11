import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function SiteHeader({ blocks }) {
  const headerButton = blocks.map((block) => (
    <Link
      key={block.path}
      to={`/${block.path}`}
    >
      {block.title}
    </Link>
  ));

  return (
    <>
      <div className="header-button-block">
        {headerButton}
      </div>
      <div className="site-body post">
        <Outlet />
      </div>
    </>
  );
}

export default SiteHeader;
