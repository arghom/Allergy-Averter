import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "./index.css";
import { SessionProvider } from "./SessionProvider.jsx";
import NotFound from "./NotFound.jsx";
import Home from "./Home.jsx";
import Recipes from "./Recipes.jsx";
import LoginView from "./LoginView.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import DisplayRecipe from './DisplayRecipe.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFound/>,
    children: [
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'recipes',
        element: <ProtectedRoute element={<Recipes />} />
      },
      {
        path:'login',
        element: <LoginView/>,
      },
      {
        path:'displayRecipe',
        element: <DisplayRecipe/>
      },

    ]
  },

])


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </React.StrictMode>
);
