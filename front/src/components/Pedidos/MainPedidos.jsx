import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BASE_URL_pedidos } from '../../constants/constant';
import useLoginStore from '../../store/useLoginStore';

const MainPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();
  const hasPermission = useLoginStore((state) => state.hasPermission);

  // Trae todos los pedidos al montar el componente
  const getPedidos = async () => {
    try {
      const response = await axios.get(BASE_URL_pedidos);
      setPedidos(response.data);
    } catch (error) {
      console.error("Error al obtener pedidos", error);
    }
  };

  // Elimina un pedido por su ID (con confirmación)
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que querés eliminar este pedido?")) {
      try {
        await axios.delete(`${BASE_URL_pedidos}/${id}`);
        getPedidos(); // Refresco la tabla luego del borrado
      } catch (error) {
        console.error("Error al eliminar el pedido:", error);
      }
    }
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
                  variant="outline-success"
                  size="sm"
                  onClick={() =>
                    navigate(`/dashboard-admin/pedidos/view/${pedido.idPedido}`)
                  }
                >
                  <i className="bi bi-eye me-1"></i> Ver
                </Button>

                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() =>
                    navigate(`/dashboard-admin/pedidos/edit/${pedido.idPedido}`)
                  }
                >
                  <i className="bi bi-pencil-square me-1"></i> Editar
                </Button>

                {hasPermission('delete', 'Pedido') && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(pedido.idPedido)}
                  >
                    <i className="bi bi-trash me-1"></i> Eliminar
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