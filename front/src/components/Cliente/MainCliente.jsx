import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useLoginStore from '../../store/useLoginStore';
import { Button,Container, Row, Col, Card } from 'react-bootstrap';

const PerfilCliente = () => {
  const navigate = useNavigate()
  const [cliente, setCliente] = useState(null);
  const user = useLoginStore(state => state.user); // Este user debería tener el idCliente
  const [pedidos, setPedidos] = useState([]);

  const getPedidos = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/pedidos/cliente/${user.idCliente}`);
    setPedidos(response.data);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
  }
};

  useEffect(() => {
    if (user?.idCliente) {
      axios.get(`http://localhost:8000/api/clientes/${user.idCliente}`)
        .then(res => setCliente(res.data))
        .catch(err => console.error('Error al obtener cliente', err));
        console.log('Usuario logueado:', user);
    };
    getPedidos();
  }, [user]);

  if (!cliente) return <p>Cargando cliente...</p>;
  if (!pedidos) return <Container className="mt-4">Cargando usuario...</Container>;
  
  
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
      <h4 className="mt-5 mb-3">Historial de Compras</h4>

{pedidos.length === 0 ? (
  <p>Este usuario aún no realizó compras.</p>
) : (
  pedidos.map(p => (
    <Card key={p.idPedido} className="mb-3">
      <Card.Header>
        <strong>Pedido #{p.idPedido}</strong>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col><strong>Fecha:</strong> {p.fecha?.split('T')[0]}</Col>
          <Col><strong>Hora:</strong> {p.hora?.substring(0, 8)}</Col>
          <Col><strong>Estado:</strong> {p.estado}</Col>
          <Col><strong>Total:</strong> ${p.total?.toFixed(2)}</Col>
        </Row>
        <Row>
          <Col><strong>Observaciones:</strong> {p.observaciones || "Sin observaciones"}</Col>
        </Row>
      </Card.Body>
    </Card>
  ))
)}
    </div>
    
    
  );
};

export default PerfilCliente;