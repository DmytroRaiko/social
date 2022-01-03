import React, { useState } from 'react';
// import Body from "./containers/Body";
import SiteHeader from './SiteHeader';
import Body from './containers/Body';

const blocks = [
  {
    title: 'Article',
    value: 'article',
  },
  {
    title: 'Add article',
    value: 'articleAdd',
  },
  {
    title: 'Profile',
    value: 'profile',
  },
  {
    title: 'ProfileD',
    value: 'krup',
  },
];

function App() {
  const [viewBlock, setViewBlock] = useState(blocks[0].value);

  return (
    <>
      <SiteHeader blocks={blocks} onSetViewBLock={setViewBlock} />
      <Body viewBLock={viewBlock} />
    </>
  );
}

export default App;
