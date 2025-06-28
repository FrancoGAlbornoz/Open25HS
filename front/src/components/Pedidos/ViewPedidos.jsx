import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL_pedidos } from '../../constants/constant';


//Accedemos desde la tabla de pedidos pasando el ID por parámetro en la URL.
const ViewPedidos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);

  //Al montar el componente o cuando cambia el ID busco el pedido en la API
  useEffect(() => {
    const getPedido = async () => {
      try {
        const response = await axios.get(`${BASE_URL_pedidos}/${id}`); // Llamo a la API con el ID recibido
        setPedido(response.data); // Guardo la respuesta en el estado
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
