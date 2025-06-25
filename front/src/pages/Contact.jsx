import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const MainContact = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  })

  const [enviado, setEnviado] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Acá podrías enviar los datos con fetch o axios
    console.log(formData)
    setEnviado(true)
    setFormData({ nombre: "", email: "", mensaje: "" })
  };

  return (
    <div>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="mb-4 text-center">Contacto</h2>
            <h4 className="mb-4 text-center">Nos contactaremos con vos en breve... </h4>

            {enviado && (
              <Alert variant="success">¡Mensaje enviado correctamente!</Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formNombre" className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Tu nombre" name="nombre" value={formData.nombre} onChange={handleChange} required/>
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="tucorreo@example.com"  name="email" value={formData.email} onChange={handleChange} required/>
              </Form.Group>
              <Form.Group controlId="formMensaje" className="mb-3">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Escribí tu mensaje..." name="mensaje" value={formData.mensaje} onChange={handleChange} required/>
              </Form.Group>
              <div className="d-grid">
                <Button variant="outline-success" type="submit">Enviar mensaje</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainContact;
