import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/login/Login';
import Scheduleduler from './pages/scheduleduler/Scheduleduler';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },

  {
    path: '/Scheduledule',
    element: <Scheduleduler />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);