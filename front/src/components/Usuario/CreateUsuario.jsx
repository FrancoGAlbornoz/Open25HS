import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Form, Button, Container, Row, Col} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {BASE_URL_usuarios} from '../../constants/constant'

const CreateUsuario = () => {

  const navigate = useNavigate()

  const [usuario, setUsuario] = useState(
    {
      nombre: "",
      mail: "",
      contraseña: "",
      idRol: "2",
    }
  )

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  //agrega a nuestra base de datos el usuario nuevo
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(BASE_URL_usuarios, usuario);
      navigate("/dashboard-admin/empleados"); 
      alert("Usuario creado correctamente")
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  return (
    <div>
      <Container className="mt-4">
      <h3>Crear Usuario</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={usuario.nombre} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="mail" value={usuario.mail} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="contraseña" value={usuario.contraseña} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="success">Crear Usuario</Button>
      </Form>
    </Container>
    </div>
  )
}

export default CreateUsuario