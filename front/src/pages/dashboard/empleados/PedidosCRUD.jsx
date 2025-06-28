import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPedidos from '../../../components/Pedidos/MainPedidos';
import EditPedidos from '../../../components/Pedidos/EditPedidos';
import ViewPedidos from '../../../components/Pedidos/ViewPedidos';
// Si en el futuro agregás crear pedidos desde el admin, también importá CreatePedido

const PedidosCRUD = () => {
  // Solo ADMIN y EMPLEADOS puede ver el CRUD de pedidos
  return (
    <Routes>
      <Route path="/" element={<MainPedidos />} />
      <Route path="edit/:id" element={<EditPedidos />} />
      <Route path="view/:id" element={<ViewPedidos />} />
      {/* <Route path="create" element={<CreatePedido />} /> */}
    </Routes>
  );
};

export default PedidosCRUD;