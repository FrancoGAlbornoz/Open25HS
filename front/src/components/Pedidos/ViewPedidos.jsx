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
      <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>
        Volver
      </Button>

      {/* Datos principales del pedido */}
      <Card className="shadow mb-4">
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

      {/* Productos comprados */}
      <Card className="shadow mb-4">
        <Card.Header as="h5">Productos Comprados</Card.Header>
        <ListGroup variant="flush">
          {pedido.productos?.map((producto, index) => (
            <ListGroup.Item key={index} className="d-flex align-items-center gap-3">
              {producto.imagen && (
                <img 
                  src={producto.imagen} 
                  alt={producto.nombreProducto} 
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} 
                />
              )}
              <div>
                <strong>{producto.nombreProducto}</strong><br />
                Cantidad: {producto.cantidad} - Subtotal: ${producto.subtotal}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      {/* Medio de pago y total */}
      <Card className="shadow">
        <Card.Header as="h5">Resumen de Pago</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Total:</strong> ${pedido.pago?.total ?? 'No disponible'}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Medio de Pago:</strong> {pedido.pago?.medioPago ?? 'No disponible'}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
};

export default ViewPedidos

