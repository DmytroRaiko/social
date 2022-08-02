import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';
import App from './App';
import ErrorBoundary from './Services/Errors/ErrorBoundary';

import './Assets/Styles/index.css';
import { AuthProvider } from './Services/Providers/authProvider';

const queryClient = new QueryClient();

ReactDOM.render(
  <SnackbarProvider maxSnack={3}>

    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>

        <AuthProvider>
          <App />
        </AuthProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  </SnackbarProvider>,
  document.getElementById('root'),
);
