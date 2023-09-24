import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './components/AuthProvider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./main.css";


import HomePage from './pages/HomePage/HomePage';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import NewProjectPage from "./pages/NewProjectPage/NewProjectPage.jsx";
import SignupPage from './pages/SignupPage/SignupPage';


import NavBar from './components/NavBar/NavBar';


const router = createBrowserRouter([
  {
    path:"/",
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/users", element: <SignupPage /> },
      { path: "/project/:id", element: <ProjectPage />},
      {path: "/projects", element: <NewProjectPage />},
      // { path: "/about", element: <AboutPage />},
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
