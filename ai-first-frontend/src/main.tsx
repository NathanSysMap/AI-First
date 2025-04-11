import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Pedidos from './pages/Pedidos'
import Catalogo from './pages/Catalogo';
import Assistente from './pages/Assistente';
import Empresa from './pages/Empresa';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/assistente" element={<Assistente />} />
        <Route path="/empresa" element={<Empresa />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
