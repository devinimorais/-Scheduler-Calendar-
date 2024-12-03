import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Scheduleduler from "./pages/scheduleduler/Scheduleduler";
import Services from "./pages/servicess/Services";
import Professionals from "./pages/professionals/Professionals";
import Home from "./pages/home/Home";
import BookTime from "./pages/BookTimes/Book times";

// Criação do roteador
const router = createBrowserRouter([
  {
    path: "/", // Página inicial (Login)
    element: <Login />
  },
  {
    path: "/home", // Página Início
    element: <Home />
  },
  {
    path: "/scheduleduler", // Página de Agendamento
    element: <Scheduleduler />
  },
  {
    path: "/services", // Página de Serviços
    element: <Services />
  },
  {
    path: "/professionals", // Página de Profissionais
    element: <Professionals />
  },
  {
    path: "/bookTime", // Página de reserva de horário
    element: <BookTime />
  }
]);

// Verifique se o elemento "root" existe antes de criar o React root
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Elemento "root" não encontrado no DOM.');
}

// Renderização da aplicação
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
