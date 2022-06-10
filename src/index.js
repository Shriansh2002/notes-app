import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { NextUIProvider } from '@nextui-org/react';
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NextUIProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </NextUIProvider>
);