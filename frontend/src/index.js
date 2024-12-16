import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <App />
      </div>
    </div>
  </React.StrictMode>
);
