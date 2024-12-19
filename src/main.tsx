import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";



import Scheduleduler from "./pages/scheduleduler/Scheduleduler";
import Services from "./pages/servicess/Services";
import Professionals from "./pages/professionals/Professionals";
import Home from "./pages/home/Home";
import BookTime from "./pages/BookTimes/Book times";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/services/16" replace />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/scheduleduler",
    element: <Scheduleduler />,
  },
  {
    path: "/services/:serviceId",
    element: <Services />,
  },
  {
    path: "/professionals",
    element: <Professionals />,
  },
  {
    path: "/bookTime",
    element: <BookTime />,
  },


]);

// Ponto de montagem do React
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Elemento "root" não encontrado no DOM.');
}

// Renderização do app
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);