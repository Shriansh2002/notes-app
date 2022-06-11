import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { createTheme, NextUIProvider } from '@nextui-org/react';
import { StrictMode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const lightTheme = createTheme({
  type: 'light',
});

const darkTheme = createTheme({
  type: 'dark',
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NextThemesProvider
    defaultTheme='system'
    attribute='class'
    value={{
      light: lightTheme.className,
      dark: darkTheme.className,

    }}>
    <NextUIProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </NextUIProvider>
  </NextThemesProvider>
);