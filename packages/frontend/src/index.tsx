import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './components/App';
import CustomThemeProvider from './containers/CustomThemeProvider';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </CustomThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
