import React, { useState } from 'react'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'

const MainRegister = () => {

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    password: '',
    confirmarPassword: '',
  });

  const [registrado, setRegistrado] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData((previo) => ({
      ...previo, [name] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmarPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Aquí podrías enviar los datos a una API o backend
    console.log('Datos de registro:', formData);
    setRegistrado(true);
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      direccion: '',
      password: '',
      confirmarPassword: ''
    });
  };

  return (
    <div>
      <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="mb-4 text-center">Registro de Cliente</h2>

          {registrado && <Alert variant="success">¡Registro exitoso!</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNombre">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control type="text"  name="nombre" value={formData.nombre} onChange={handleChange} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" name="telefono" value={formData.telefono} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" name="direccion" value={formData.direccion} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" value={formData.password} onChange={handleChange} required/>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formConfirmarPassword">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control type="password" name="confirmarPassword" value={formData.confirmarPassword} onChange={handleChange} required/>
            </Form.Group>

            <div className="d-grid">
              <Button variant="outline-success" type="submit">Registrarme</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default MainRegister