import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useLoginStore from '../../store/useLoginStore';
import {Button} from 'react-bootstrap'

const PerfilCliente = () => {
  const navigate = useNavigate()
  const [cliente, setCliente] = useState(null);
  const user = useLoginStore(state => state.user); // Este user debería tener el idCliente

  useEffect(() => {
    if (user?.idCliente) {
      axios.get(`http://localhost:8000/api/clientes/${user.idCliente}`)
        .then(res => setCliente(res.data))
        .catch(err => console.error('Error al obtener cliente', err));
        console.log('Usuario logueado:', user);
    }
  }, [user]);

  if (!cliente) return <p>Cargando cliente...</p>;
  
  return (
    <div className="container mt-4">
      <h2>Mi Perfil</h2>
      <p><strong>Nombre y apellido:</strong> {cliente.nombre}</p>
      <p><strong>Direccion:</strong> {cliente.direccion}</p>
      <p><strong>Telefono:</strong> {cliente.telefono}</p>
      <p><strong>Email:</strong> {cliente.mail}</p>
      {/* Agregá más campos si querés */}
      <div className="mt-4">
        <Button variant="primary" onClick={() => navigate('/dashboard-cliente/editar')}>Editar perfil</Button>
      </div>
      <br />
    </div>
    
    
  );
};

export default PerfilCliente;