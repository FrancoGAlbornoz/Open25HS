import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BASE_URL_pedidos } from '../../constants/constant';
import useLoginStore from '../../store/useLoginStore';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MainPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();
  const hasPermission = useLoginStore((state) => state.hasPermission);

  const getPedidos = async () => {
    try {
      const response = await axios.get(BASE_URL_pedidos);
      setPedidos(response.data);
    } catch (error) {
      console.error("Error al obtener pedidos", error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer. El pedido será eliminado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${BASE_URL_pedidos}/${id}`);
          Swal.fire('¡Eliminado!', 'El pedido fue borrado correctamente.', 'success');
          getPedidos(); // Recargar la lista
        } catch (error) {
          console.error("Error al eliminar el pedido:", error);
          Swal.fire('Error', 'Hubo un problema al eliminar el pedido.', 'error');
        }
      }
    });
  };

  useEffect(() => {
    getPedidos();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Lista de Pedidos</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>ID Cliente</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.idPedido}>
              <td>{pedido.idPedido}</td>
              <td>{pedido.fecha?.split('T')[0]}</td>
              <td>{pedido.hora?.substring(0, 8)}</td>
              <td>{pedido.idCliente}</td>
              <td>{pedido.estado}</td>
              <td className="d-flex gap-2 justify-content-center">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => navigate(`/dashboard-admin/pedidos/view/${pedido.idPedido}`)}
                >
                  <FaEye />
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => navigate(`/dashboard-admin/pedidos/edit/${pedido.idPedido}`)}
                >
                  <FaEdit />
                </Button>
                {hasPermission('delete', 'Pedido') && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(pedido.idPedido)}
                  >
                    <FaTrash />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MainPedidos;
