import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './pages/login/login'
import Scheduleduler from './pages/scheduleduler/Scheduleduler'
import "./index.css";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
    <Scheduleduler />
  </StrictMode>
)
