import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const MainLogin = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { email, password } = formData;

    // Validación mínima
    if (!email || !password) {
      setError('Por favor completá todos los campos.');
      return;
    }

    // Simulación de login (esto se reemplazará con verificación real)
    if (email === 'cliente@ejemplo.com' && password === '123456') {
      setLoggedIn(true);
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };


  return (
    <div>
      <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="mb-4 text-center">Iniciar Sesión</h2>

          {loggedIn && <Alert variant="success">¡Inicio de sesión exitoso!</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" placeholder="ejemplo@correo.com" name="email" value={formData.email} onChange={handleChange} required/>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="********" name="password" value={formData.password} onChange={handleChange} required/>
            </Form.Group>

            <div className="d-grid">
              <Button variant="danger" type="submit">Iniciar Sesión</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default MainLogin