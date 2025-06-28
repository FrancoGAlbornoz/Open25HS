//react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Paginas y rutas
import ProtectedRoute from './components/ProtectedRoute';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Carrito from "./pages/Carrito"
import {home,  register, login} from "./routes/path";

//Componentes de CRUD de produtos
import ViewProduct from "./components/Producto/ViewProduct";
import CreateProduct from "./components/Producto/CreateProduct";
import EditProduct from "./components/Producto/EditProduct";

//Componentes de CRUD de users
import ViewUsuario from "./components/Usuario/ViewUsuario";
import CreateUsuario from "./components/Usuario/CreateUsuario";
import EditUsuario from "./components/Usuario/EditUsuario";

//Todos los productos
import ProductosPorCategoria from "./components/Producto/ProductsCategoria";

//Componentes basico header y footer
import Header from "./components/Header";
import Footer from "./components/Footer";

//CRUDS(admin-empleado-cliente)
import ProductosCRUDEmpleado from './pages/dashboard/empleados/ProductosCRUD';
import ProductosCRUDAdmin from './pages/dashboard/admin/ProductosCRUD';
import UsuariosCRUDAdmin from './pages/dashboard/admin/UsuariosCRUD';
import PedidosCRUDAdmin from "./pages/dashboard/admin/PedidosCRUD";
import PedidosCRUDEmpleado from './pages/dashboard/empleados/PedidosCRUD';
import ClienteRU from "./pages/dashboard/cliente/ClienteRU";


//CRUDS de pedidos



function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={home} element={<Home />} />
          <Route path={register} element={<Register />} />
          <Route path={login} element={<Login />} />
          <Route path="/categoria/:nombreCategoria" element={<ProductosPorCategoria />}/>
          
          <Route path="/products/view/:id" element={ <ProtectedRoute allowedRol={['Administrador','Empleado']} action="view" table="Producto">   <ViewProduct /> </ProtectedRoute> } />
          <Route path="/products/create" element={  <ProtectedRoute allowedRol={['Administrador','Empleado']} action="create" table="Producto">    <CreateProduct /> </ProtectedRoute> } />
          <Route path="/products/edit/:id" element={ <ProtectedRoute allowedRol={['Administrador','Empleado']} action="edit" table="Producto">  <EditProduct /> </ProtectedRoute>} />

          <Route path="/usuarios/view/:id" element={ <ProtectedRoute allowedRol={['Administrador']} action="view" table="Usuario">  <ViewUsuario /> </ProtectedRoute> } />
          <Route path="/usuarios/create" element={ <ProtectedRoute allowedRol={['Administrador']} action="create" table="Usuario">  <CreateUsuario /> </ProtectedRoute> } />
          <Route path="/usuarios/edit/:id" element={ <ProtectedRoute allowedRol={['Administrador']} action="edit" table="Usuario">  <EditUsuario /> </ProtectedRoute> } />

          <Route path="*" element={<Error />} />
          
          <Route path="/dashboard-empleados/productos/*" element={<ProtectedRoute allowedRol={['Administrador','Empleado']} action="view" table="Producto"><ProductosCRUDEmpleado /></ProtectedRoute>}/>
    
          <Route path="/dashboard-admin/productos/*" element={<ProtectedRoute allowedRol={['Administrador']} action="view" table="Producto"><ProductosCRUDAdmin /></ProtectedRoute>}/>
          <Route path="/dashboard-admin/empleados/*" element={<ProtectedRoute allowedRol={['Administrador']} action="view" table="Usuario"><UsuariosCRUDAdmin /></ProtectedRoute>}/>
          <Route path="/dashboard-admin/pedidos/*" element={<ProtectedRoute allowedRol={['Administrador']} action="view" table="Pedido"><PedidosCRUDAdmin /></ProtectedRoute>}/>
          <Route path="/dashboard-empleados/pedidos/*" element={<ProtectedRoute allowedRol={['Empleado']} action="view" table="Pedido"><PedidosCRUDEmpleado /></ProtectedRoute>}/>  

          <Route path="/dashboard-cliente/*" element={<ProtectedRoute action="view" table="Cliente"> <ClienteRU /></ProtectedRoute>}/>
          <Route path="/carrito" element={<ProtectedRoute > <Carrito /></ProtectedRoute>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
