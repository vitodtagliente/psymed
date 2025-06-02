import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+
import App from './App'; // Assuming your component is in App.js
import './index.css'; // You might have a global CSS file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);