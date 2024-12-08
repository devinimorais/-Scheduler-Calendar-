import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Importação das páginas
import Login from "./pages/login/Login";
import Scheduleduler from "./pages/scheduleduler/Scheduleduler";
import Services from "./pages/servicess/Services";
import Professionals from "./pages/professionals/Professionals";
import Home from "./pages/home/Home";
import BookTime from "./pages/BookTimes/Book times";

// Definição das rotas
const router = createBrowserRouter([
  {
    path: "/", // Página inicial (Login)
    element: <Login />,
  },
  {
    path: "/home", // Página inicial após login
    element: <Home />,
  },
  {
    path: "/scheduleduler", // Página de agendamento
    element: <Scheduleduler />,
  },
  {
    path: "/services/:serviceId", // Página de serviços com ID dinâmico
    element: <Services />,
  },
  {
    path: "/professionals", // Página de profissionais
    element: <Professionals />,
  },
  {
    path: "/bookTime", // Página de reserva de horários
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
