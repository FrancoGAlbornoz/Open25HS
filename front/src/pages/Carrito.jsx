// pages/Carrito.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import useCartStore from '../store/useCartStore';
import useLoginStore from '../store/useLoginStore';

const Carrito = () => {
  const { items, quitarDelCarrito, vaciarCarrito } = useCartStore();
  const { user } = useLoginStore();

  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const confirmarCompra = async () => {
    if (!user || !user.idCliente) {
      Swal.fire('Inicia sesión', 'Debes iniciar sesión como cliente para confirmar la compra.', 'warning');
      return;
    }

    const resultado = await Swal.fire({
      title: '¿Confirmar compra?',
      text: `Total: $${total}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
    });

    if (resultado.isConfirmed) {
      try {
        await axios.post('http://localhost:8000/api/pedidos', {
          idCliente: user.idCliente,
          items
        });

        Swal.fire('Compra confirmada', 'Gracias por tu compra', 'success');
        vaciarCarrito();
      } catch (error) {
        console.error('Error al confirmar compra:', error);
        Swal.fire('Error', 'No se pudo completar la compra. Intenta más tarde.', 'error');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Carrito de Compras</h2>

      {items.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <ul className="list-group">
            {items.map(item => (
              <li
                key={item.idProducto}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{item.nombre} x{item.cantidad}</span>
                <div>
                  <span className="me-3">${item.precio * item.cantidad}</span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => quitarDelCarrito(item.idProducto)}
                  >
                    Quitar
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 d-flex justify-content-between align-items-center">
            <h4>Total: ${total}</h4>
            <div className="d-flex gap-2">
              <Button variant="warning" onClick={vaciarCarrito}>Vaciar carrito</Button>
              <Button variant="success" onClick={confirmarCompra}>Confirmar compra</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
