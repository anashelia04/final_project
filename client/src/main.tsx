import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

// Configure Axios defaults
axios.defaults.baseURL = 'http://localhost:3000'; // Your backend server
axios.defaults.withCredentials = true; // Allow cookies to be sent

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Wrap App with AuthProvider */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);