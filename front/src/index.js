import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

import './index.css';
import { AuthProvider } from './containers/providers/authProvider';

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
