import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import useUserStore from '../store/useLoginStore';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ mail: '', contraseña: '' })
  const [error, setError] = useState('')
  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const { mail, contraseña } = formData;
    if (!mail || !contraseña) {
      setError('Por favor completá todos los campos.')
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/login', {
        mail,
        contraseña
      });

      const data = res.data;
      setUser(data) // Zustand
    } 
    catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Correo o contraseña incorrectos.')
      } else {
        setError('Error de conexión con el servidor.')
      }
    }
  
  }
  
  //-------------------------------------
  return (
    <div>
      <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="mb-4 text-center">Iniciar Sesión</h2>

          {user && <Alert variant="success">¡Inicio de sesión exitoso! Bienvenido {user.nombre}</Alert> && navigate("/")}
          {error && <Alert variant="danger">{error}</Alert>}

          {!user && (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="ejemplo@correo.com" name="mail" value={formData.mail} onChange={handleChange} required/>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="********" name="contraseña" value={formData.contraseña} onChange={handleChange} required/>
              </Form.Group>

              <div className="d-grid">
                <Button variant="danger" type="submit">Iniciar Sesión</Button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Login

