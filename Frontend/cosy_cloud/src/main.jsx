import { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Create from "./Components/Create.jsx";
import Listing from "./Components/Listings.jsx";
import Root from "./Components/Root.jsx";
import Update from "./Components/Update.jsx";
import Expand from "./Components/Expand.jsx";
import Register from "./Components/Register.jsx";
import Login from "./Components/Login.jsx";
import { AuthContextProvider } from "../Contexts/AuthContext.jsx";
import MyListings from "./Components/MyListings.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Listing,
      },
      {
        path : "listings/new",
        Component : Create
      }, 
      {
        path : "listings/:id/edit", 
        Component : Update
      }, 
      {
        path : "listings/:id/details",
        Component : Expand
      }, 
      {
        path : "signup", 
        Component : Register
      }, 
      {
        path  : "login", 
        Component : Login
      }, 
      {
        path : "listings/my", 
        Component : MyListings
      }, 
      {
        path : "listings/my/:id/details", 
        Component : Expand
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
<AuthContextProvider>
  <RouterProvider router={router} />
</AuthContextProvider>
);
