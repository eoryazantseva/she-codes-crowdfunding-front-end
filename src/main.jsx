import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./main.css";


import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import LoginPage from "./pages/LoginPage.jsx";


import NavBar from './components/NavBar/NavBar';

const router = createBrowserRouter([
  {
    path:"/",
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/project/:id", element: <ProjectPage />},
      
      // { path: "/about", element: <AboutPage />},
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
