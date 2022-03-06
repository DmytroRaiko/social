import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import SiteHeader from './containers/SiteHeader';
import AddArticle from './components/AddArticle';
import Profiles from './containers/profiles/Profiles';
import DateComponent from './components/DateComponent';
import Posts from './containers/post/Posts';
import Post from './containers/post/Post';
import Profile from './containers/profiles/Profile';
import PostComments from './containers/post/PostComments';
import ProfileEdit from './containers/profiles/ProfileEdit';
import Login from './login';
import context from './services/context';
import ErrorBoundary from './components/ErrorBoundary';

const queryClient = new QueryClient();

function App() {
  const [contextData, setContextData] = useState({
    authAccess: false,
    userData: null,
    setContextData: () => {},
  });

  // temporary context value - start
  useEffect(() => {
    setContextData({
      authAccess: true,
      userData: {
        id: 1,
        name: 'Dmitry Raiko',
        icon: null,
      },
      setContextData,
    });
  }, []);
  // end

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <context.Provider value={contextData}>
          <BrowserRouter>
            <SiteHeader />
            <div className="site-body">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/articles" element={<Posts />} />
                <Route path="/article/:id" element={<Post />} />
                <Route path="/articles/:id/comments" element={<PostComments />} />
                <Route path="/articleAdd" element={<AddArticle />} />
                <Route path="/profiles" element={<Profiles />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/profile/:id/edit" element={<ProfileEdit />} />
                <Route path="/date/:date" element={<DateComponent />} />

                <Route path="*" element={<div> 404 </div>} />
              </Routes>
            </div>
          </BrowserRouter>
        </context.Provider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
