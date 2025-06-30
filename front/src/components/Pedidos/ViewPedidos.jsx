import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL_pedidos } from '../../constants/constant';
import { Container, Card, ListGroup, Button, Spinner } from 'react-bootstrap';

const ViewPedidos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const getPedido = async () => {
      try {
        const response = await axios.get(`${BASE_URL_pedidos}/${id}`);
        setPedido(response.data);
      } catch (error) {
        console.error('Error al obtener el pedido', error);
      }
    };
    getPedido();
  }, [id]);

  if (!pedido) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="my-4">
      <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>Volver</Button>

      <Card className="shadow">
        <Card.Header as="h4">Detalle del Pedido</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>ID:</strong> {pedido.idPedido}</ListGroup.Item>
          <ListGroup.Item><strong>Fecha:</strong> {pedido.fecha?.split('T')[0]}</ListGroup.Item>
          <ListGroup.Item><strong>Hora:</strong> {pedido.hora?.substring(0, 8)}</ListGroup.Item>
          <ListGroup.Item><strong>ID Cliente:</strong> {pedido.idCliente}</ListGroup.Item>
          <ListGroup.Item><strong>Estado:</strong> {pedido.estado}</ListGroup.Item>
          <ListGroup.Item><strong>Observaciones:</strong> {pedido.observaciones}</ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  )
}

export default ViewPedidos