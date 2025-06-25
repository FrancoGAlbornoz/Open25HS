import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL_products } from '../../constants/constant'
import { BASE_URL_categorias } from '../../constants/constant'
import { BASE_URL_marcas } from '../../constants/constant'
import { BASE_URL_proveedores } from '../../constants/constant'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'



const ViewProduct = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const [product, setProduct] =useState(null)
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  
  const getProduct = async () =>{
    try {
      const response = await axios.get(`${BASE_URL_products}/${id}`)
      setProduct(response.data[0])
    } catch (error) {
      console.error("Error al obtener producto:", error);
    }
  }

  const getExtras = async () => {
    try {
      const catResponse = await axios.get(BASE_URL_categorias);
      setCategorias(catResponse.data);

      const marResponse = await axios.get(BASE_URL_marcas);
      setMarcas(marResponse.data);

      const provResponse = await axios.get(BASE_URL_proveedores);
      setProveedores(provResponse.data);


      console.log("CATEGORIAS", catResponse.data);
      console.log("MARCAS", marResponse.data);
      console.log("PROVEEDORES", provResponse.data);
    } catch (error) {
      console.error("Error al obtener categorías/marcas/proveedores:", error);
    }
  };

  const getCategoriaNombre = (id) => {
    const categoria = categorias.find(cat => cat.idCategoria === id);
    return categoria ? categoria.nombre : `ID: ${id}`;
  };

  const getMarcaNombre = (id) => {
    const marca = marcas.find(m => m.idMarca === id);
    return marca ? marca.nombre : `ID: ${id}`;
  };

  const getProveedorNombre = (id) => {
    const proveedor = proveedores.find(p => p.idProveedor === id);
    return proveedor ? proveedor.nombre : `ID: ${id}`;
  };


  useEffect(() => {
    getProduct()
    getExtras();
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
              <Col><strong>Proveedor:</strong> {getProveedorNombre(product.idProveedor)}</Col>
              <Col><strong>Categoría:</strong> {getCategoriaNombre(product.idCategoria)}</Col>
              <Col><strong>Marca:</strong> {getMarcaNombre(product.idMarca)}</Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default ViewProduct