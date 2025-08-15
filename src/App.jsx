
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './App.css'

import Main from './components/pages/Home/Main'
import Container from './components/layout/Container'
import Footer from './components/layout/Footer'
import Produtos from './components/pages/Produtos/Produtos'
import Clientes from './components/pages/Cliente/Clientes'
import Vendas from './components/pages/Vendas/Vendas'
import Error403 from './components/layout/Error403'
import Error404 from './components/layout/Error404'
import NovoProduto from './components/forms/NovoProduto'
import NovoCliente from './components/forms/NovoCliente'
import DetalhesCliente from './components/pages/Cliente/DetalhesCliente'
import NovoVendedor from './components/forms/NovoVendedor'
import Vendedores from './components/pages/Vendedor/Vendedores'
import DetalhesVendedor from './components/pages/Vendedor/DetalhesVendedor'
import DeletarCliente from './components/forms/DeletarCliente'
import EditarCliente from './components/forms/EditarCliente'
import Carrinho from './components/pages/Vendas/Carrinho'
import { CartProvider } from './components/context/CartContext'
import NovaVenda from './components/forms/NovaVenda'
import EditarVendedor from './components/forms/EditarVendedor'
import DeletarVendedor from './components/forms/DeletarVendedor'
import DetalhesVenda from './components/pages/Vendas/DetalhesVenda'
import NovoAdmin from './components/forms/NovoAdmin'
import Usuarios from './components/pages/Usuarios/Usuarios'
import EditarUsuario from './components/forms/EditarUsuario'
import DeletarUsuario from './components/forms/DeletarUsuario'
import DetalhesUsuario from './components/pages/Usuarios/DetalhesUsuario'




function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Error403 />;
  }
  return children;
}



function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(() => {

    return !!localStorage.getItem("token");
  });

  useEffect(() => {

    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <Router>
      <CartProvider>
        <Container>
          <Routes>
            {/* Rota pública */}
            <Route path="/" element={<Main />} />

            {/* Rota protegida */}

            <Route
              path="/produtos"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Produtos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/novoProduto"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <NovoProduto />
                </ProtectedRoute>
              }
            />

            <Route
              path="/carrinho"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Carrinho />
                </ProtectedRoute>
              }
            />

            <Route
              path="/novoCliente"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <NovoCliente />
                </ProtectedRoute>
              }
            />

            <Route
              path="/novoVendedor"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <NovoVendedor />
                </ProtectedRoute>
              }
            />

            <Route
              path="/detalhesCliente/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <DetalhesCliente />
                </ProtectedRoute>
              }
            />
            <Route
              path="/detalhesVendedor/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <DetalhesVendedor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/excluirCliente/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <DeletarCliente />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editarCliente/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <EditarCliente />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clientes"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Clientes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendedores"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Vendedores />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editarVendedor/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <EditarVendedor />
                </ProtectedRoute>
              }
            />

            <Route
              path="/excluirVendedor/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <DeletarVendedor />
                </ProtectedRoute>
              }
            />

            <Route
              path="/vendas"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Vendas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/novaVenda"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <NovaVenda />
                </ProtectedRoute>
              }
            />
            <Route
              path="/detalhesVenda/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <DetalhesVenda />
                </ProtectedRoute>
              }
            />
            <Route
              path="/usuarios"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Usuarios />
                </ProtectedRoute>
              }
            />
            <Route
              path="/novoAdmin"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <NovoAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/detalhesUsuario/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <DetalhesUsuario />
                </ProtectedRoute>
              }
            />


            <Route
              path="/editarUsuario/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <EditarUsuario />
                </ProtectedRoute>
              }
            />
            <Route
              path="/excluirUsuario/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <DeletarUsuario />
                </ProtectedRoute>
              }
            />

            {/* Rota para páginas não encontradas */}

            <Route path="*" element={<Error404 />} />

          </Routes>

        </Container>


      </CartProvider>
    </Router>
  )
}

export default App
