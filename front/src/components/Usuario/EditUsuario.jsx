import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useLoginStore from "../../store/useLoginStore";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { BASE_URL_usuarios } from "../../constants/constant";

const EditUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useLoginStore((state) => state.user);
  console.log(user)

  const [usuario, setUsuario] = useState({
    nombre: "",
    mail: "",
    idRol: "2",
  });


  const getUsuario = async () => {
    try {
      const response = await axios.get(`${BASE_URL_usuarios}/${id}`);
      setUsuario(response.data);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  };

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL_usuarios}/${id}`, usuario);
      //navigate("/Usuarios");
      navigate(user.rol === 'Administrador' ? '/dashboard-admin/empleados' : '/dashboard-empleados/productos')
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  useEffect(() => {
    getUsuario()
  }, []);


  return (
    <div>
      <Container className="mt-4">
        <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>Volver</Button>
        <Card>
          <Card.Header><h3>Editar Usuario</h3></Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="nombre" className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="nombre" value={usuario.nombre} onChange={handleChange} required/>
                  </Form.Group>

                  <Form.Group controlId="mail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="mail" rows={3} value={usuario.mail} onChange={handleChange} required/>
                  </Form.Group>

                </Col>
              </Row>

              <div className="d-grid">
                <Button variant="success" type="submit" >Guardar Cambios</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default EditUsuario;
