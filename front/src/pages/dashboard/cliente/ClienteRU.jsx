// ClienteRU.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainClient from '../../../components/Cliente/MainCliente';
import EditClient from '../../../components/Cliente/EditCliente';

const ClienteRU = () => {
  return (
    <Routes>
      <Route path="/perfil" element={<MainClient />} />
      <Route path="/editar" element={<EditClient />} />
    </Routes>
  );
};

export default ClienteRU;