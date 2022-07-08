import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route, Navigate,
} from 'react-router-dom';
import SiteHeader from './containers/SiteHeader';
import AddArticle from './components/AddArticle';
import Profiles from './containers/profiles/Profiles';
import DateComponent from './components/DateComponent';
import Posts from './containers/post/Posts';
import Post from './containers/post/Post';
import Profile from './containers/profiles/Profile';
import ProfileEdit from './containers/profiles/ProfileEdit';
import Login from './containers/auth/Login';
import Registration from './containers/auth/Registration';
import ForgotPassword from './containers/auth/ForgotPassword';
import ResetPassword from './containers/auth/ResetPassword';
import useAuth from './containers/providers/authProvider';
import { Loader } from './components/Loader';

function App() {
  const { isLoading, isAuth } = useAuth();

  if (isLoading) {
    return (
      <div className="auth-page">
        <Loader />
      </div>
    );
  }

  if (!isAuth) {
    return (
      <BrowserRouter>
        <div className="auth-page">
          <Routes>
            <Route
              path="/"
              element={
                <Navigate replace to="/sign-in" />
            }
            />

            <Route path="sign-in" index element={<Login />} />
            <Route path="sign-up" element={<Registration />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:hash" element={<ResetPassword />} />

            <Route path="*" element={<Navigate replace to="/sign-in" />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <SiteHeader />
      <div className="site-body">
        <Routes>
          <Route path="sign-in" index element={<Navigate replace to="/articles" />} />
          <Route path="sign-up" element={<Navigate replace to="/articles" />} />
          <Route path="forgot-password" element={<Navigate replace to="/articles" />} />
          <Route path="reset-password/:hash" element={<Navigate replace to="/articles" />} />

          <Route path="/articles" element={<Posts />} />
          <Route path="/article/:id" element={<Post />} />
          <Route path="/articleAdd" element={<AddArticle />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/:id/edit" element={<ProfileEdit />} />
          <Route path="/date/:date" element={<DateComponent />} />

          <Route path="*" element={<div> 404 </div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
