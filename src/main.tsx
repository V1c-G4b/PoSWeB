// src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./app";
import "./index.css";
import { PointOfSale } from "./pages/pos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:"sale",
        index: true,
        element: <PointOfSale/>, 
      },
      {
        path:"about",
        index:true,
        element: <PointOfSale/>
      },
      {
        path:"contact",
        index:true,
        element: <PointOfSale/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
