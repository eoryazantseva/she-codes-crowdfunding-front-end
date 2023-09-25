import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './components/AuthProvider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./main.css";
import NotFound from './components/NotFound';

import HomePage from './pages/HomePage/HomePage';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import NewProjectPage from "./pages/NewProjectPage/NewProjectPage.jsx";
import SignupPage from './pages/SignupPage/SignupPage';
import UpdateProjectPage from './pages/UpdateProjectPage/UpdateProjectPage';



import NavBar from './components/NavBar/NavBar';
import UpdateProject from './components/UpdateProjectForm';


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
      {path: "/update-project/:id/", element: <UpdateProjectPage />},
      {path: '*', element: <NotFound />},
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
