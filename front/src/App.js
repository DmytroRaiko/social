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
import ProfileID from './components/ProfileID';

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

const user = {
  name: 'test',
  age: '23',
  avatar: {
    file: {
      id: 1,
      name: '123.jpg',
      path: '/files/1.jpg',
    },
  },
  files: [
    {
      id: 1,
      name: '123.jpg',
      path: '/files/1.jpg',
    },
    {
      id: 1,
      name: '123.jpg',
      path: '/files/1.jpg',
    }],
  addrr: {
    main: {
      line1: 'test',
      line2: 'test',
      city: 'test',
      zip: 1234,
    },
    alt: {
      line1: 'test',
      line2: 'test',
      city: 'test',
      zip: 1234,
    },
  },
  friends: [
    {
      name: 'test',
      age: '23',
      avatar: {
        file: {
          id: 1,
          name: '123.jpg',
          path: '/files/1.jpg',
        },
      },
      files: [
        {
          id: 1,
          name: '123.jpg',
          path: '/files/1.jpg',
        },
        {
          id: 1,
          name: '123.jpg',
          path: '/files/1.jpg',
        }],
      addrr: {
        main: {
          line1: 'test',
          line2: 'test',
          city: 'test',
          zip: 1234,
        },
        alt: {
          line1: 'test',
          line2: 'test',
          city: 'test',
          zip: 1234,
        },
      },
    },
  ],
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SiteHeader blocks={blocks} />}>
          <Route path="article" element={<Post />} />
          <Route path="article/:id" element={<PostWithID />} />
          <Route path="articleAdd" element={<AddArticle />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:id" element={<ProfileID user={user} />} />
          <Route path="date/:date" element={<DateComponent />} />

          <Route path="*" element={<div> 404 </div>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
