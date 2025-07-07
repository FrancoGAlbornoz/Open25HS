import '../styles/header.css';
import useLoginStore from "../store/useLoginStore";
import useCartStore from "../store/useCartStore";
import { useNavigate, Link, useParams } from 'react-router-dom';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { Nav, Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  const user = useLoginStore((state) => state.user);
  const clearUser = useLoginStore((state) => state.clearUser);
  const { items } = useCartStore();
  const navigate = useNavigate();
  const { nombreCategoria } = useParams(); // <- para saber la categoría actual

  const [mostrarInput, setMostrarInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    clearUser();//Viene de zustand y pone a user a null
    useCartStore.getState().clearCart(); // Limpia el carrito
    navigate('/login');
  };

  const totalCantidad = items.reduce((acc, item) => acc + item.cantidad, 0);
  const iconColor = totalCantidad > 0 ? "#FF6347" : "#9CB6BC";

  return (
    <div>
      <header className="custom-header">
        <Container fluid className="top-bar py-2">
          <Row className="align-items-center">
            <Col xs={8} className="text-center">
              <Nav.Link href="/"><img src={logo} alt="Logo" className="logo" /></Nav.Link>
            </Col>

            <Col xs={4} className="d-flex justify-content-end align-items-center gap-2 position-relative">
              
              {/* 🔍 Botón de búsqueda con input desplegable */}
              <div className="position-relative">
                <Button
                  variant="white"
                  className="p-2 border-1 shadow-sm rounded-circle"
                  onClick={() => setMostrarInput(!mostrarInput)}
                >
                  <FaSearch style={{ color: "#9CB6BC", fontSize: "1.2rem" }} />
                </Button>

                {mostrarInput && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (searchQuery.trim()) {
                        const categoriaActual = nombreCategoria || 'galletas'; // categoría por defecto
                        navigate(`/categoria/${categoriaActual}?busqueda=${encodeURIComponent(searchQuery.trim())}`);
                        setMostrarInput(false);
                        setSearchQuery('');
                      }
                    }}
                    className="position-absolute"
                    style={{
                      top: '130%',
                      right: 0,
                      zIndex: 999,
                      background: 'white',
                      padding: '6px 8px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    }}
                  >
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar productos..."
                      style={{
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        width: '160px'
                      }}
                      autoFocus
                    />
                  </form>
                )}
              </div>

              {/* 🛒 Carrito */}
              <Button as={Link} to="/carrito" variant="white" className="p-2 border-1 shadow-sm rounded-circle position-relative">
                <FaShoppingCart style={{ color: iconColor, fontSize: "1.2rem" }} />
                {totalCantidad > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    background: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 6px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    lineHeight: 1
                  }}>
                    {totalCantidad}
                  </span>
                )}
              </Button>
            </Col>
          </Row>
        </Container>

        {/* 🔗 Barra de navegación */}
        <div className="nav-bar">
          <Nav className="justify-content-center">
            <Nav.Link as={Link} to="/categoria/galletas" className="nav-items">GALLETAS</Nav.Link>
            <Nav.Link as={Link} to="/categoria/alfajores" className="nav-items">ALFAJORES</Nav.Link>
            <Nav.Link as={Link} to="/categoria/chocolates" className="nav-items">CHOCOLATES</Nav.Link>
            <Nav.Link as={Link} to="/categoria/golosinas" className="nav-items">GOLOSINAS</Nav.Link>
            <Nav.Link as={Link} to="/categoria/bebidas" className="nav-items">BEBIDAS</Nav.Link>
            <Nav.Link as={Link} to="/categoria/healthy" className="nav-items">HEALTHY</Nav.Link>
            <Nav.Link as={Link} to="/categoria/almacen" className="nav-items">ALMACÉN</Nav.Link>

            {user && (user.rol === 'Empleado' || user.rol === 'Administrador') && (
              <Button
                variant="warning"
                className="nav-item"
                onClick={() => navigate(user.rol === 'Administrador' ? '/dashboard-admin/productos' : '/dashboard-empleados/productos')}
              >
                Ver productos
              </Button>
            )}
            {user ? (
              <>
                {user.rol === 'Empleado' && (
                  <Button as={Link} variant="warning" to="/dashboard-empleados/pedidos" className="nav-item">
                    Ver pedidos
                  </Button>
                  
                )}
                {user.rol === 'Administrador' && (
                  <Button as={Link} variant="warning" to="/dashboard-admin/empleados" className="nav-item">
                    Ver empleados
                  </Button>
                  
                )}
                {user.rol === 'Administrador' && (
                  <Button as={Link} variant="warning" to="/dashboard-admin/pedidos" className="nav-item">
                    Ver pedidos
                  </Button>
                  
                )}
                {user.rol === 'Cliente' && (
                  <Button as={Link} to="/dashboard-cliente/perfil" variant="success" className="me-2">
                    Mi Perfil
                  </Button>
                )}
                <Button variant="danger" onClick={handleLogout} className="nav-item">Cerrar Sesión</Button>
              </>
            ) : (
              <>
                <Button as={Link} variant="primary" to="/Register" className="nav-item active nav-reg">REGISTRATE</Button>
                <Button as={Link} variant="primary" to="/Login" className="nav-item active nav-log">LOGIN</Button>
              </>
            )}
          </Nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
