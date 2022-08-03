import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Posts from '../Pages/Post/Posts';
import Post from '../Pages/Post';
import Profiles from '../Pages/Profile/Profiles';
import Profile from '../Pages/Profile';
import ProfileEdit from '../Pages/Profile/ProfileEdit';
import FriendsPageContainer from '../Containers/Friends/FriendsPageContainer';
import HistorySeen from '../Containers/Post/HistorySeen';

const PrivateRouters = () => (
  <Routes>
    <Route path="sign-in" index element={<Navigate replace to="/articles" />} />
    <Route path="sign-up" element={<Navigate replace to="/articles" />} />
    <Route path="forgot-password" element={<Navigate replace to="/articles" />} />
    <Route path="reset-password/:hash" element={<Navigate replace to="/articles" />} />

    <Route path="/articles" element={<Posts />} />
    <Route path="/article/:postId" element={<Post />} />
    <Route path="/profiles" element={<Profiles />} />
    <Route path="/profile/:profileId" element={<Profile />} />
    <Route path="/profile/:profileId/edit" element={<ProfileEdit />} />
    <Route path="/profile/:profileId/friends" element={<FriendsPageContainer />} />

    <Route path="/history/seen" element={<HistorySeen />} />

    <Route path="*" element={<div> 404 </div>} />
  </Routes>
);

export default PrivateRouters;
