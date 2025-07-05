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

    // Mientras el pedido no esté cargado muestro un mensaje de carga
  if (!pedido) return <div>Cargando...</div>;

    // Renderizo los datos del pedido cuando ya están disponibles
  return (
    <div>
      <h2>Detalle del Pedido</h2>
      <p><b>ID:</b> {pedido.idPedido}</p>
      <p><b>Fecha:</b> {pedido.fecha?.split('T')[0]}</p>
      <p><b>Hora:</b> {pedido.hora?.substring(0, 8)}</p>
      <p><b>ID Cliente:</b> {pedido.idCliente}</p>
      <p><b>Estado:</b> {pedido.estado}</p>
      <p><b>Observaciones:</b> {pedido.observaciones}</p>
      <button onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};

export default ViewPedidos;
