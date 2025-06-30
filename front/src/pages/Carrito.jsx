import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import useCartStore from '../store/useCartStore';
import useLoginStore from '../store/useLoginStore';
import '../styles/Carrito.css'; 

const Carrito = () => {
  const { items, quitarDelCarrito, vaciarCarrito, incrementarCantidad, disminuirCantidad } = useCartStore();
  const { user } = useLoginStore();

  const [mediosPago, setMediosPago] = useState([]);
  const [medioPagoSeleccionado, setMedioPagoSeleccionado] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [observaciones, setObservaciones] = useState(""); // NUEVO

  //Tomolos medios de pago de la bd. con axios.get
  useEffect(() => {
    axios.get('http://localhost:8000/api/mediopago')
      .then(res => setMediosPago(res.data))
      .catch(err => console.error('Error al cargar medios de pago', err));
  }, []);

  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const manejarConfirmarCompra = () => {
    if (!user || !user.idCliente) {
      Swal.fire('Inicia sesión', 'Debes iniciar sesión como cliente para confirmar la compra.', 'warning');
      return;
    }

    if (!medioPagoSeleccionado) {
      Swal.fire('Falta elegir medio de pago', 'Seleccioná un medio de pago para continuar.', 'warning');
      return;
    }

    setShowModal(true);
  };

  const confirmarCompra = async () => {
    try {
      //Registramoslos pedidos en la bd. con axios.post
      await axios.post('http://localhost:8000/api/pedidos', {
        idCliente: user.idCliente,
        idMedioPago: medioPagoSeleccionado,
        items,
        observaciones // NUEVO
      });

      Swal.fire('Compra confirmada', 'Gracias por tu compra', 'success');
      vaciarCarrito();
      setMedioPagoSeleccionado('');
      setObservaciones(''); // NUEVO
      setShowModal(false);
    } catch (error) {
      console.error('Error al confirmar compra:', error);
      Swal.fire('Error', 'No se pudo completar la compra. Intenta más tarde.', 'error');
    }
  };

  const medioPagoNombre = mediosPago.find(m => m.idMedioPago === Number(medioPagoSeleccionado))?.nombre || '';


  return (
    <div className="container mt-4">
      <h2>Carrito de Compras</h2>

      {items.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <ul className="list-group">
            {items.map(item => (
              <li key={item.idProducto} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <strong>{item.nombre}</strong>
                  <Button variant="outline-secondary" size="sm" onClick={() => disminuirCantidad(item.idProducto)} disabled={item.cantidad <= 1}> − </Button>
                  <span>{item.cantidad}</span>
                  <Button variant="outline-secondary" size="sm" onClick={() => incrementarCantidad(item.idProducto)}> + </Button>
                </div>
                <div>
                  <span className="me-3">${item.precio * item.cantidad}</span>
                  <Button variant="danger" size="sm" onClick={() => quitarDelCarrito(item.idProducto)}>Quitar</Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <Form.Group controlId="medioPago">
              <Form.Label>Seleccionar medio de pago</Form.Label>
              <Form.Select value={medioPagoSeleccionado} onChange={(e) => setMedioPagoSeleccionado(e.target.value)}>
                <option value="">-- Seleccionar --</option>
                {mediosPago.map(m => (
                  <option key={m.idMedioPago} value={m.idMedioPago}>{m.nombre}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

          {/* NUEVO: Observaciones */}
          <div className="mt-3">
            <Form.Group controlId="observaciones">
              <Form.Label>Observaciones para el pedido</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={observaciones}
                onChange={e => setObservaciones(e.target.value)}
                placeholder="¿Alguna aclaración o pedido especial?"
              />
            </Form.Group>
          </div>

          <div className="mt-4 d-flex justify-content-between align-items-center">
            <h4>Total: ${total}</h4>
            <div className="d-flex gap-2">
              <Button variant="warning" onClick={vaciarCarrito}>Vaciar carrito</Button>
              <Button variant="success" onClick={manejarConfirmarCompra}>Confirmar compra</Button>
            </div>
          </div>
            {/* TIKCET DE COMPRA AQUI*/}
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Ticket de Compra</Modal.Title>
            </Modal.Header>
            <Modal.Body className="ticket-modal-body">
              <div className="ticket-header">
                <strong>--- OPEN 25 HS ---</strong>
                <br />
                <small>{new Date().toLocaleString()}</small>
              </div>

              {items.map(item => (
                <div key={item.idProducto} className="ticket-item">
                  <div>{item.nombre} x {item.cantidad}</div>
                  <div>${(item.precio * item.cantidad).toFixed(2)}</div>
                </div>
              ))}

              <div className="ticket-total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="ticket-payment">
                Medio de pago: {medioPagoNombre}
              </div>

              {/* Mostrar observaciones en el ticket si existen */}
              {observaciones && (
                <div className="ticket-observaciones mt-2">
                  <strong>Observaciones:</strong>
                  <div>{observaciones}</div>
                </div>
              )}

              <div className="ticket-thanks">
                ¡Gracias por su compra!
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button variant="success" onClick={confirmarCompra}>Confirmar</Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Carrito;