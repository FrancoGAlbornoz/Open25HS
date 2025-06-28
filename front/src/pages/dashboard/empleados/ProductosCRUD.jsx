import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateProduct from '../../../components/Producto/CreateProduct';
import EditProduct from '../../../components/Producto/EditProduct';
import ViewProduct from '../../../components/Producto/ViewProduct';
import MainProducts from '../../../components/Producto/MainProducts';

const ProductosCRUD = () => {
  // EMPLEADOS SOLO PUEDE VER CRUD DE PRODUCTOS- 
  return (
    <Routes>
      <Route path="/" element={<MainProducts />} />
      <Route path="create" element={<CreateProduct />} />
      <Route path="edit/:id" element={<EditProduct />} />
      <Route path="view/:id" element={<ViewProduct />} />
    </Routes>
  );
};

export default ProductosCRUD;