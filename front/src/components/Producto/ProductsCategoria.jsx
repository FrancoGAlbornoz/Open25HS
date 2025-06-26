import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Col, Row, Card } from "react-bootstrap";
import useCartStore from "../../store/useCartStore";
import useLoginStore from "../../store/useLoginStore";

const ProductosPorCategoria = () => {
  const { nombreCategoria } = useParams();
  const [productos, setProductos] = useState([]);

  const agregarAlCarrito = useCartStore((state) => state.agregarAlCarrito);
  const hasPermission = useLoginStore((state) => state.hasPermission);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/productos")
      .then((res) => {
        const productosFiltrados = res.data.filter((producto) => {
          if (!producto.nombre_categoria || !nombreCategoria) return false;
          return (
            producto.nombre_categoria.toLowerCase() ===
            nombreCategoria.toLowerCase()
          );
        });
        setProductos(productosFiltrados);
      })
      .catch((err) => console.error(err));
  }, [nombreCategoria]);

  const handleAgregar = (producto) => {
    agregarAlCarrito({
      idProducto: producto.idProducto,
      nombre: producto.nombre,
      precio: producto.precioVenta,
    });
  };

  return (
    <div className="container mt-4">
      <br />
      <h2 className="mb-4 text-capitalize">Productos de {nombreCategoria}</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {productos.map((producto) => (
          <Col key={producto.idProducto}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={producto.imagen}
                alt={producto.nombre}
              />
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>
                  <strong>${producto.precioVenta}</strong>
                </Card.Text>
                {hasPermission('create', 'Carrito') && (
                  <Button
                    variant="success"
                    onClick={() => handleAgregar(producto)}
                  >
                    Agregar al carrito
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <br />
    </div>
  );
};

export default ProductosPorCategoria;
