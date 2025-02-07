import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ResumeGenerator from './components/ResumeGenerator';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ResumeGenerator />
    </ThemeProvider>
  );
}

export default App;
