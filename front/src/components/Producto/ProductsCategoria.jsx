import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Button, Col, Row, Card, Modal } from "react-bootstrap";
import useCartStore from "../../store/useCartStore";
import useLoginStore from "../../store/useLoginStore";
import "../../styles/ProductsCategoria.css";

const ProductosPorCategoria = () => {
  const { nombreCategoria } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const palabraBuscada = queryParams.get("busqueda")?.toLowerCase() || "";

  const [productos, setProductos] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const agregarAlCarrito = useCartStore((state) => state.agregarAlCarrito);
  const hasPermission = useLoginStore((state) => state.hasPermission);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/productos")
      .then((res) => {
        const productosFiltrados = res.data.filter((producto) => {
          const nombreProducto = producto.nombre?.toLowerCase() || "";
          const categoriaProducto = producto.nombre_categoria?.toLowerCase() || "";

          const coincideBusqueda = palabraBuscada
            ? nombreProducto.includes(palabraBuscada)
            : true;

          const coincideCategoria = nombreCategoria
            ? categoriaProducto === nombreCategoria.toLowerCase()
            : true;

          // Si hay búsqueda, ignorar categoría y solo filtrar por nombre
          return palabraBuscada ? coincideBusqueda : coincideCategoria;
        });

        setProductos(productosFiltrados);

        const iniciales = {};
        productosFiltrados.forEach((p) => {
          iniciales[p.idProducto] = 1;
        });
        setCantidades(iniciales);
      })
      .catch((err) => console.error(err));
  }, [nombreCategoria, palabraBuscada]);

  const cambiarCantidad = (idProducto, nuevaCantidad, stock) => {
    if (nuevaCantidad < 1 || nuevaCantidad > stock) return;
    setCantidades((prev) => ({ ...prev, [idProducto]: nuevaCantidad }));
  };

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setProductoSeleccionado(null);
  };

  const handleAgregar = (producto) => {
    if (!hasPermission("create", "Carrito")) {
      navigate("/login");
      return;
    }

    const carrito = useCartStore.getState().items;
    const enCarrito = carrito.find(
      (item) => item.idProducto === producto.idProducto
    );
    const cantidadEnCarrito = enCarrito ? enCarrito.cantidad : 0;
    const cantidadSeleccionada = cantidades[producto.idProducto] || 1;

    if (cantidadEnCarrito + cantidadSeleccionada > producto.stock) {
      alert(`Solo hay ${producto.stock} unidades disponibles.`);
      return;
    }

    agregarAlCarrito({
      idProducto: producto.idProducto,
      nombre: producto.nombre,
      precio: producto.precioVenta,
      cantidad: cantidadSeleccionada,
    });

    setCantidades((prev) => ({ ...prev, [producto.idProducto]: 1 }));
    cerrarModal();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-capitalize">
        {palabraBuscada
          ? `Resultados para "${palabraBuscada}"`
          : `Productos de ${nombreCategoria}`}
      </h2>

      {productos.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {productos.map((producto) => {
            const cantidad = cantidades[producto.idProducto] || 1;

            return (
              <Col key={producto.idProducto}>
                <Card
                  className="h-100"
                  style={{ cursor: "pointer" }}
                  onClick={() => abrirModal(producto)}
                >
                  <Card.Img
                    variant="top"
                    src={producto.imagen}
                    alt={producto.nombre}
                  />
                  <Card.Body onClick={(e) => e.stopPropagation()}>
                    <Card.Title>{producto.nombre}</Card.Title>
                    <Card.Text>
                      <strong>${producto.precioVenta}</strong>
                    </Card.Text>

                    {hasPermission("create", "Carrito") && (
                      <>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <Button
                            variant="outline-secondary"
                            onClick={() =>
                              cambiarCantidad(
                                producto.idProducto,
                                cantidad - 1,
                                producto.stock
                              )
                            }
                            disabled={cantidad <= 1}
                          >
                            -
                          </Button>
                          <span>{cantidad}</span>
                          <Button
                            variant="outline-secondary"
                            onClick={() =>
                              cambiarCantidad(
                                producto.idProducto,
                                cantidad + 1,
                                producto.stock
                              )
                            }
                            disabled={cantidad >= producto.stock}
                          >
                            +
                          </Button>
                        </div>

                        <Button
                          variant="success"
                          onClick={() => handleAgregar(producto)}
                          disabled={producto.stock === 0}
                        >
                          {producto.stock === 0
                            ? "Sin stock"
                            : "Agregar al carrito"}
                        </Button>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      {productoSeleccionado && (
        <Modal show={showModal} onHide={cerrarModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{productoSeleccionado.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={productoSeleccionado.imagen}
              alt={productoSeleccionado.nombre}
              className="img-fluid mb-3"
            />
            <p>
              <strong>Precio:</strong> ${productoSeleccionado.precioVenta}
            </p>
            <p>
              <strong>Cantidad disponible:</strong> {productoSeleccionado.stock}
            </p>

            {hasPermission("create", "Carrito") ? (
              <>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Button
                    variant="outline-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      cambiarCantidad(
                        productoSeleccionado.idProducto,
                        (cantidades[productoSeleccionado.idProducto] || 1) - 1,
                        productoSeleccionado.stock
                      );
                    }}
                    disabled={(cantidades[productoSeleccionado.idProducto] || 1) <= 1}
                  >
                    -
                  </Button>
                  <span>{cantidades[productoSeleccionado.idProducto] || 1}</span>
                  <Button
                    variant="outline-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      cambiarCantidad(
                        productoSeleccionado.idProducto,
                        (cantidades[productoSeleccionado.idProducto] || 1) + 1,
                        productoSeleccionado.stock
                      );
                    }}
                    disabled={
                      (cantidades[productoSeleccionado.idProducto] || 1) >=
                      productoSeleccionado.stock
                    }
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="success"
                  onClick={() => handleAgregar(productoSeleccionado)}
                  disabled={productoSeleccionado.stock === 0}
                >
                  {productoSeleccionado.stock === 0
                    ? "Sin stock"
                    : "Agregar al carrito"}
                </Button>
              </>
            ) : (
              <p>
                <em>Debes iniciar sesión para agregar productos al carrito.</em>
              </p>
            )}
          </Modal.Body>
        </Modal>
      )}
      <br />
    </div>
  );
};

export default ProductosPorCategoria;
