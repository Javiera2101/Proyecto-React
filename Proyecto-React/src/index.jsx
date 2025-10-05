import React from 'react';
import ReactDOM from 'react-dom/client';
// 👇 1. Importa BrowserRouter
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// 👇 2. Envuelve <App/> con <BrowserRouter>
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);