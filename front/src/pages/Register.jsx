import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const navigate = useNavigate();

  //campos del formulario de registro
  const [formData, setFormData] = useState({
    nombre: '',
    mail: '',
    telefono: '',
    direccion: '',
    contraseña: '',
    confirmarPassword: '',
  });

  const [registrado, setRegistrado] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previo) => ({ ...previo, [name]: value,}));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setRegistrado(false);

    if (formData.contraseña !== formData.confirmarPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const nuevoCliente = {
      nombre: formData.nombre,
      direccion: formData.direccion,
      telefono: formData.telefono,
      mail: formData.mail,           
      contraseña: formData.contraseña,  
      idRol: 3                        // Rol 3 para cliente
    };

    try {
      //Registramos cliente en la bd. con axios.post
      const res = await axios.post('http://localhost:8000/api/clientes', nuevoCliente);
      console.log('Cliente registrado:', res.data);

      setRegistrado(true);
      setFormData({
        nombre: '',
        mail: '',
        telefono: '',
        direccion: '',
        contraseña: '',
        confirmarPassword: '',
      });

      // Redirigir al login
      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (err) {
      console.error('Error al registrar:', err);
      const msg = err.response?.data?.error || 'Error al registrarse.';
      setError(msg);
    }
  };

  //-------------------------------------
  return (
    <div>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="mb-4 text-center">Registro de Cliente</h2>

            {registrado && <Alert variant="success">¡Registro exitoso! Redirigiendo al login...</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" name="mail" value={formData.mail} onChange={handleChange} required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="text" name="telefono" value={formData.telefono} onChange={handleChange} required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDireccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" name="direccion" value={formData.direccion} onChange={handleChange} required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} required/>
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
  );
};

export default Register;