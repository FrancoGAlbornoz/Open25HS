import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import {Form, Button, Container, Row, Col} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {BASE_URL_products} from '../../constants/constant'

const CreateProduct = () => {

  const navigate = useNavigate()

  const [product, setProduct] = useState(
    {
      nombre: "",
      descripcion: "",
      stock: "",
      precioVenta: "",
      precioCompra: "",
      idProveedor: "",
      idCategoria: "",
      idMarca: "",
      imagen: "", 
    }
  )
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  // tomo las categorias, marcas y proveedores para luego seleccionar correspondientemente al producto nuevo a crear.
  const fetchCategorias = async () => {
    const response = await axios.get("http://localhost:8000/categorias");
    setCategorias(response.data);
  };

  const fetchMarcas = async () => {
    const response = await axios.get("http://localhost:8000/marcas");
    setMarcas(response.data);
  };

  const fetchProveedores = async () => {
    const response = await axios.get("http://localhost:8000/proveedores");
    setProveedores(response.data);
  };
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  //agrega a nuestra base de datos el producto nuevo
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(BASE_URL_products, product);
      navigate("/products"); // o donde tengas tu lista de productos
      alert("Producto creado correctamente")
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  useEffect(() => {
    fetchCategorias();
    fetchMarcas();
    fetchProveedores();
  }, []);

  return (
    <div>
      <Container className="mt-4">
      <h3>Crear Producto</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={product.nombre} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control type="text" name="descripcion" value={product.descripcion} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control type="text" name="imagen" value={product.imagen} onChange={handleChange}/>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" name="stock" value={product.stock} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio Venta</Form.Label>
              <Form.Control type="number" name="precioVenta" value={product.precioVenta} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio Compra</Form.Label>
              <Form.Control type="number" name="precioCompra" value={product.precioCompra} onChange={handleChange}/>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Proveedor</Form.Label>
              <Form.Select  name="idProveedor"  value={product.idProveedor} onChange={handleChange}>
                <option value="">Seleccione un proveedor</option>
                {proveedores.map((p) => (
                  <option key={p.idProveedor} value={p.idProveedor}>
                    {p.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select name="idCategoria" value={product.idCategoria} onChange={handleChange}>
                <option value="">Seleccione una categoría</option>
                {categorias.map((c) => (
                  <option key={c.idCategoria} value={c.idCategoria}>
                    {c.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Marca</Form.Label>
              <Form.Select name="idMarca" value={product.idMarca} onChange={handleChange}>
                <option value="">Seleccione una marca</option>
                {marcas.map((m) => (
                  <option key={m.idMarca} value={m.idMarca}>
                    {m.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="success">Crear Producto</Button>
      </Form>
    </Container>
    </div>
  )
}

export default CreateProduct