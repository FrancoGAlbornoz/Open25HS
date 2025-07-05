import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BASE_URL_products } from '../../constants/constant';
import useLoginStore from '../../store/useLoginStore';
import Swal from 'sweetalert2';

const MainProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const hasPermission = useLoginStore((state) => state.hasPermission);

  const getProducts = async () => {
    try {
      const response = await axios.get(BASE_URL_products);
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener productos', error);
    }
  };

  const handleDelete = async (id, nombreProducto) => {
    Swal.fire({
      title: `¿Eliminar "${nombreProducto}"?`,
      text: 'Esta acción no se puede deshacer. El producto será eliminado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${BASE_URL_products}/${id}`);
          Swal.fire('¡Eliminado!', `"${nombreProducto}" fue borrado correctamente.`, 'success');
          getProducts(); // Refrescar la tabla
        } catch (error) {
          console.error('Error al eliminar producto:', error);
          Swal.fire('Error', 'Hubo un problema al eliminar el producto.', 'error');
        }
      }
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Lista de Productos</h2>
          {hasPermission('create', 'Producto') && (
            <Button variant="primary" onClick={() => navigate('/products/create')}>
              Crear Producto
            </Button>
          )}
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Stock</th>
              <th>Precio Venta</th>
              <th>Precio Compra</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.idProducto}>
                <td>{product.idProducto}</td>
                <td>{product.nombre}</td>
                <td>{product.descripcion}</td>
                <td>{product.stock}</td>
                <td>${product.precioVenta}</td>
                <td>${product.precioCompra}</td>
                <td className="d-flex gap-2">
                  {hasPermission('view', 'Producto') && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => navigate(`/products/view/${product.idProducto}`)}
                    >
                      <FaEye />
                    </Button>
                  )}
                  {hasPermission('edit', 'Producto') && (
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => navigate(`/products/edit/${product.idProducto}`)}
                    >
                      <FaEdit />
                    </Button>
                  )}
                  {hasPermission('delete', 'Producto') && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(product.idProducto, product.nombre)}
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
      <br />
    </div>
  );
};

export default MainProducts;