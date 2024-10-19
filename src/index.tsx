import React from 'react';
import ReactDOM from 'react-dom/client';
// import {BrowserRouter} from 'react-router-dom';
import App from './App.js'; // Ensure this path is correct
import './index.css'; // Optional, for styles

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
