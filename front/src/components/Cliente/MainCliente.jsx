import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useLoginStore from '../../store/useLoginStore';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import "../../styles/MainCliente.css";

const PerfilCliente = () => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const user = useLoginStore(state => state.user); // user.idCliente esperado

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
      getPedidos();
    }
  }, [user]);

  if (!cliente) return <p>Cargando cliente...</p>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Mi Perfil</h2>
      <Card>
        <Card.Body>
          <Row>
            <Col md={6}><strong>Nombre y apellido:</strong> {cliente.nombre}</Col>
            <Col md={6}><strong>Dirección:</strong> {cliente.direccion}</Col>
          </Row>
          <Row className="mt-2">
            <Col md={6}><strong>Teléfono:</strong> {cliente.telefono}</Col>
            <Col md={6}><strong>Email:</strong> {cliente.mail}</Col>
          </Row>
          <div className="mt-3 text-end">
            <Button variant="outline-primary" onClick={() => navigate('/dashboard-cliente/editar')}>
              Editar perfil
            </Button>
          </div>
        </Card.Body>
      </Card>

      <h4 className="mt-5 mb-3">Historial de Compras</h4>
      {pedidos.length === 0 ? (
        <p>Este usuario aún no realizó compras.</p>
      ) : (
        pedidos.map(p => (
          <Card key={p.idPedido} className="mb-3 shadow-sm">
            <Card.Header className="d-flex justify-content-between">
              <span><strong>Pedido #{p.idPedido}</strong></span>
              <span className={`estado-pedido estado-${p.estado.toLowerCase()}`}>
                {p.estado === 'completado' ? '✅ Completado' : '🕒 Pendiente'}
              </span>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col><strong>Fecha:</strong> {p.fecha?.split('T')[0]}</Col>
                <Col><strong>Hora:</strong> {p.hora?.substring(0, 8)}</Col>
                <Col><strong>Total:</strong> ${p.total?.toFixed(2)}</Col>
              </Row>
              <Row className="mt-2">
                <Col><strong>Observaciones:</strong> {p.observaciones || "Sin observaciones"}</Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default PerfilCliente;
