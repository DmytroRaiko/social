import React from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';
import Index from './Layouts/Header';
import useAuth from './Services/Providers/authProvider';
import { PageLoader } from './Layouts/Loaders/PageLoader';
import PublicRouters from './Routes/PublicRouters';
import PrivateRouters from './Routes/PrivateRouters';

function App() {
  const { isLoading, isAuth, user } = useAuth();

  if (isLoading) {
    return (
      <div className="auth-page">
        <PageLoader />
      </div>
    );
  }

  if (!isLoading && !isAuth && !user?.user?.profileId) {
    return (
      <BrowserRouter>
        <div className="auth-page">
          <PublicRouters />
        </div>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Index />
      <div className="site-body">
        <PrivateRouters />
      </div>
    </BrowserRouter>
  );
}

export default App;
