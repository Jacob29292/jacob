import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('[DEBUG] main.tsx loaded');

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
