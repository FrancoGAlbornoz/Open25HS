import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { BASE_URL_products, } from "../../constants/constant";
import { BASE_URL_categorias } from "../../constants/constant";
import { BASE_URL_marcas } from "../../constants/constant";
import { BASE_URL_proveedores } from "../../constants/constant";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    stock: "",
    precioVenta: "",
    precioCompra: "",
    idProveedor: "",
    idCategoria: "",
    idMarca: "",
    imagen: "",
  });
  const [proveedores, setProveedores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);

  const getProduct = async () => {
    try {
      const response = await axios.get(`${BASE_URL_products}/${id}`);
      setProduct(response.data[0]);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL_products}/${id}`, product);
      navigate("/products");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

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


  useEffect(() => {
    getProduct()
    getExtras()
  }, []);
  return (
    <div>
      <Container className="mt-4">
        <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>Volver</Button>
        <Card>
          <Card.Header><h3>Editar Producto</h3></Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="nombre" className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="nombre" value={product.nombre} onChange={handleChange} required/>
                  </Form.Group>

                  <Form.Group controlId="descripcion" className="mb-3">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" name="descripcion" rows={3} value={product.descripcion} onChange={handleChange} required/>
                  </Form.Group>

                  <Form.Group controlId="imagen" className="mb-3">
                    <Form.Label>URL de Imagen</Form.Label>
                    <Form.Control type="text" name="imagen" value={product.imagen} onChange={handleChange}/>
                  </Form.Group>

                  <Form.Group controlId="stock" className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" name="stock" value={product.stock} onChange={handleChange} required/>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="precioVenta" className="mb-3">
                    <Form.Label>Precio Venta</Form.Label>
                    <Form.Control type="number" name="precioVenta" value={product.precioVenta} onChange={handleChange} required/>
                  </Form.Group>

                  <Form.Group controlId="precioCompra" className="mb-3">
                    <Form.Label>Precio Compra</Form.Label>
                    <Form.Control type="number" name="precioCompra" value={product.precioCompra} onChange={handleChange} required/>
                  </Form.Group>

                  <Form.Group controlId="idProveedor" className="mb-3">
                    <Form.Label>Proveedor</Form.Label>
                    <Form.Select name="idProveedor" value={product.idProveedor} onChange={handleChange} required>
                      <option value="">Seleccione un proveedor</option>
                      {proveedores.map((prov) => (
                        <option key={prov.idProveedor} value={prov.idProveedor}>
                          {prov.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group controlId="idCategoria" className="mb-3">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Select name="idCategoria" value={product.idCategoria} onChange={handleChange} required>
                      <option value="">Seleccione una categoría</option>
                      {categorias.map((cat) => (
                        <option key={cat.idCategoria} value={cat.idCategoria}>
                          {cat.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group controlId="idMarca" className="mb-3">
                    <Form.Label>Marca</Form.Label>
                    <Form.Select name="idMarca" value={product.idMarca} onChange={handleChange} required>
                      <option value="">Seleccione una marca</option>
                      {marcas.map((marca) => (
                        <option key={marca.idMarca} value={marca.idMarca}>
                          {marca.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-grid">
                <Button variant="success" type="submit">Guardar Cambios</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default EditProduct;
