import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../Pages/Auth/Login';
import Registration from '../Pages/Auth/Registration';
import ForgotPassword from '../Pages/Auth/ForgotPassword';
import ResetPassword from '../Pages/Auth/ResetPassword';

const PublicRouters = () => (
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
);

export default PublicRouters;
