import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateUsuario from '../../../components/Usuario/CreateUsuario';
import EditUsuario from '../../../components/Usuario/EditUsuario';
import ViewUsuario from '../../../components/Usuario/ViewUsuario';
import MainUsuarios from '../../../components/Usuario/MainUsuarios';

const UsuariosCRUD = () => {
  // ADMIN PUEDE VER CRUD DE EMPLEADOS y productos- 
  return (
    <Routes>
      <Route path="/" element={<MainUsuarios />} />
      <Route path="create" element={<CreateUsuario />} />
      <Route path="edit/:id" element={<EditUsuario />} />
      <Route path="view/:id" element={<ViewUsuario />} />
    </Routes>
  );
};

export default UsuariosCRUD;