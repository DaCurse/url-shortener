import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import CustomThemeProvider from './containers/CustomThemeProvider';

ReactDOM.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <CssBaseline />
      <App />
    </CustomThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
