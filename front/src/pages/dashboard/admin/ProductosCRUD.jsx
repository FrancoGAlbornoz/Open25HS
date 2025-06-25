import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateProduct from '../../../components/Product/CreateProduct';
import EditProduct from '../../../components/Product/EditProduct';
import ViewProduct from '../../../components/Product/ViewProduct';
import MainProducts from '../../../components/Product/MainProducts';

const ProductosCRUD = () => {
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