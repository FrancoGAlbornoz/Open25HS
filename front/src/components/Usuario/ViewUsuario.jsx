import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL_usuarios } from '../../constants/constant'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'


const ViewUsuario = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState([]);
  
  const getUsuario = async () =>{
    try {
      const response = await axios.get(`${BASE_URL_usuarios}/${id}`)
      setUsuario(response.data)
    } catch (error) {
      console.error("Error al obtener usuario:", error);
    }
  }


  useEffect(() => {
    getUsuario();
  }, [])
  
  if (!usuario) return <Container className="mt-4">Cargando usuario...</Container>;

  return (
    <div>
    <Container className="mt-4">
      <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>Volver</Button>
      <Card>
        <Card.Header>
          <h3>Detalles del Usuario</h3>
        </Card.Header>
        <Card.Body>
          <Row className="mb-2">
            <Col><strong>ID:</strong> {usuario.idUsuario}</Col>
            <Col><strong>Nombre:</strong> {usuario.nombre}</Col>
          </Row>
          <Row className="mb-2">
            <Col><strong>Email:</strong> {usuario.mail}</Col>
            <Col><strong>Rol:</strong> {usuario.idRol}</Col>
          </Row>
          {/* Si querés ocultar la contraseña visualmente, simplemente omití esta fila */}
          <Row className="mb-2">
            <Col><strong>Contraseña:</strong> {usuario.contraseña}</Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>  
    <br />
    </div>
  )
}

export default ViewUsuario