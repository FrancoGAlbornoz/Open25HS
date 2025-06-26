import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Carrito from "./pages/Carrito"
import {home, aboutus, contact, register, login} from "./routes/path";

import ViewProduct from "./components/Producto/ViewProduct";
import CreateProduct from "./components/Producto/CreateProduct";
import EditProduct from "./components/Producto/EditProduct";

import ViewUsuario from "./components/Usuario/ViewUsuario";
import CreateUsuario from "./components/Usuario/CreateUsuario";
import EditUsuario from "./components/Usuario/EditUsuario";

import ProductosPorCategoria from "./components/Producto/ProductsCategoria";

import Header from "./components/Header";
import Footer from "./components/Footer";

import ProductosCRUDEmpleado from './pages/dashboard/empleados/ProductosCRUD';
import ProductosCRUDAdmin from './pages/dashboard/admin/ProductosCRUD';
import UsuariosCRUDAdmin from './pages/dashboard/admin/UsuariosCRUD';
import ClienteRU from "./pages/dashboard/cliente/ClienteRU";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={home} element={<Home />} />
          <Route path={aboutus} element={<AboutUs />} />
          <Route path={contact} element={<Contact />} />
          <Route path={register} element={<Register />} />
          <Route path={login} element={<Login />} />
          {/* <Route path="/carrito" element={<Carrito/>}/> */}
          
          <Route path="/products/view/:id" element={<ViewProduct />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          
          <Route path="/categoria/:nombreCategoria" element={<ProductosPorCategoria />}/>

          <Route path="/usuarios/view/:id" element={<ViewUsuario />} />
          <Route path="/usuarios/create" element={<CreateUsuario />} />
          <Route path="/usuarios/edit/:id" element={<EditUsuario />} />

          <Route path="*" element={<Error />} />
          
          <Route path="/dashboard-empleados/productos/*" element={<ProtectedRoute action="view" table="Producto"><ProductosCRUDEmpleado /></ProtectedRoute>}/>
          <Route path="/dashboard-admin/productos/*" element={<ProtectedRoute allowedRol={['Administrador']} action="view" table="Producto"><ProductosCRUDAdmin /></ProtectedRoute>}/>
          <Route path="/dashboard-admin/empleados/*" element={<ProtectedRoute allowedRol={['Administrador']} action="view" table="Usuario"><UsuariosCRUDAdmin /></ProtectedRoute>}/>

          <Route path="/dashboard-cliente/*" element={<ProtectedRoute action="view" table="Cliente"> <ClienteRU /></ProtectedRoute>}/>
          <Route path="/carrito" element={<ProtectedRoute > <Carrito /></ProtectedRoute>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
