import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import SiteHeader from './SiteHeader';
import AddArticle from './components/AddArticle';
import Profiles from './containers/profiles/Profiles';
import DateComponent from './components/DateComponent';
import Posts from './containers/post/Posts';
import Post from './containers/post/Post';
import Profile from './containers/profiles/Profile';

const queryClient = new QueryClient();
const blocks = [
  {
    title: 'Articles',
    path: 'articles',
  },
  {
    title: 'Add article',
    path: 'articleAdd',
  },
  {
    title: 'Profiles',
    path: 'profiles',
  },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>

        <SiteHeader blocks={blocks} />
        <div className="site-body post">
          <Routes>
            <Route path="/articles" element={<Posts />} />
            <Route path="/article/:id" element={<Post />} />
            <Route path="/articleAdd" element={<AddArticle />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/date/:date" element={<DateComponent />} />

            <Route path="*" element={<div> 404 </div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
