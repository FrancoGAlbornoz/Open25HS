import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL_products } from '../../constants/constant'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'



const ViewProduct = () => {

  const {id} = useParams()
  const [product, setProduct] =useState(null)
  const navigate = useNavigate()

  
  
  const getProduct = async () =>{
    try {
      const response = await axios.get(`${BASE_URL_products}/${id}`)
      setProduct(response.data[0])
    } catch (error) {
      console.error("Error al obtener producto:", error);
    }
  }

  useEffect(() => {
    getProduct()
  }, [])
  
  if (!product) return <Container className="mt-4">Cargando producto...</Container>;

  return (
    <div>
      <Container className="mt-4">
        <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>Volver</Button>
        <Card>
          <Card.Header>
            <h3>Detalles del Producto</h3>
          </Card.Header>
          <Card.Body>
            {product.imagen && (
              <div className="text-center mb-4">
                <img src={product.imagen} alt={product.nombre} style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "contain" }}className="img-fluid rounded shadow"/>
              </div>
            )}

            <Row className="mb-2">
              <Col><strong>ID:</strong> {product.idProducto}</Col>
              <Col><strong>Nombre:</strong> {product.nombre}</Col>
            </Row>
            <Row className="mb-2">
              <Col><strong>Descripción:</strong> {product.descripcion}</Col>
            </Row>
            <Row className="mb-2">
              <Col><strong>Stock:</strong> {product.stock}</Col>
              <Col><strong>Precio Venta:</strong> ${product.precioVenta}</Col>
              <Col><strong>Precio Compra:</strong> ${product.precioCompra}</Col>
            </Row>
            <Row className="mb-2">
              <Col><strong>Proveedor ID:</strong> {product.idProveedor}</Col>
              <Col><strong>Categoría ID:</strong> {product.idCategoria}</Col>
              <Col><strong>Marca ID:</strong> {product.idMarca}</Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default ViewProduct