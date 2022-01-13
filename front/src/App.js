import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import SiteHeader from './SiteHeader';
import AddArticle from './components/AddArticle';
import Profile from './components/Profile';
import Post from './containers/post/Post';
import PostWithID from './components/PostWithID';
import DateComponent from './components/DateComponent';

const blocks = [
  {
    title: 'Article',
    path: 'article',
  },
  {
    title: 'Add article',
    path: 'articleAdd',
  },
  {
    title: 'Profile',
    path: 'profile',
  },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SiteHeader blocks={blocks} />}>
          <Route path="article" element={<Post />} />
          <Route path="article/:id" element={<PostWithID />} />
          <Route path="articleAdd" element={<AddArticle />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="date/:date" element={<DateComponent />} />

          <Route path="*" element={<div> 404 </div>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
