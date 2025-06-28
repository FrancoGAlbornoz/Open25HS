import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL_pedidos } from '../../constants/constant';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

// Estados del pedido
const estados = [
  'pendiente',
  'procesando',
  'completado',
  'cancelado'
];

 // Estado que contiene los datos del pedido a editar
const EditPedidos = () => {
  const { id } = useParams(); // Tomo el ID del pedido desde la URL
  const navigate = useNavigate();
  const [pedido, setPedido] = useState({
    fecha: "",
    hora: "",
    idCliente: "",
    estado: "pendiente",
    observaciones: ""
  });

  useEffect(() => {
  const getPedido = async () => {
    try {
      const response = await axios.get(`${BASE_URL_pedidos}/${id}`);
      const data = response.data;
      // Formatear fecha a YYYY-MM-DD si viene en formato ISO
      let fechaFormateada = data.fecha;
      if (fechaFormateada && fechaFormateada.includes('T')) {
        fechaFormateada = fechaFormateada.split('T')[0];
      }
      setPedido({
        ...data,
        fecha: fechaFormateada
      });
    } catch (error) {
      console.error('Error al obtener el pedido', error);
    }
  };
  getPedido();
}, [id]);

// Manejo del cambio de inputs en el formulario
  const handleChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  };

// Al enviar el formulario actualizo el pedido en la base de datos y vuelvo al panel
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL_pedidos}/${id}`, pedido);
      navigate('/dashboard-admin/pedidos');// Redirijo al listado después de guardar
    } catch (error) {
      console.error('Error al actualizar el pedido', error);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <h2>Editar Pedido</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="fecha">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control type="date" name="fecha" value={pedido.fecha} OnChange={handleChange}/>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="hora">
                  <Form.Label>Hora</Form.Label>
                  <Form.Control type="time"  name="hora" value={pedido.hora} onChange={handleChange}/>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="idCliente">
                  <Form.Label>ID Cliente</Form.Label>
                  <Form.Control type="number" name="idCliente" value={pedido.idCliente} onChange={handleChange}/>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="estado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select name="estado" value={pedido.estado} onChange={handleChange}>
                    {estados.map((estado) => (
                      <option key={estado} value={estado}>{estado}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="observaciones">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control as="textarea" name="observaciones" value={pedido.observaciones} onChange={handleChange}  rows={3} placeholder="Observaciones"/>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => navigate(-1)}> Cancelar </Button>
              <Button variant="primary" type="submit"> Guardar </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditPedidos;