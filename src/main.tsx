// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'react-circular-progressbar/dist/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import React, { StrictMode } from 'react';
import App from './app/App';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App />
  // </StrictMode>
);
