import '../styles/header.css'
import useLoginStore from "../store/useLoginStore"
import { useNavigate , Link} from 'react-router-dom'
import {FaSearch, FaShoppingCart} from 'react-icons/fa'
import {Nav, Container, Row, Col, Button} from 'react-bootstrap'
import logo from '../assets/logo.png'

const Header = () => {

    const user = useLoginStore((state) => state.user);
    const clearUser = useLoginStore((state) => state.clearUser)
    const navigate = useNavigate()

    const handleLogout = () => {
    clearUser()
    navigate('/login')
    };

  return (
    <div>
      <header className="custom-header">
      <Container fluid className="top-bar py-2">
        <Row className="align-items-center">
          <Col xs={8} className="text-center">
            <Nav.Link href="/"><img src={logo} alt="Logo" className="logo"/></Nav.Link>
          </Col>
          <Col xs={2} className="d-flex justify-content-end align-items-center gap-2">
            <Button variant="white" className="p-2 border-1 shadow-sm rounded-circle">
              <FaSearch style={{ color: "#9CB6BC", fontSize: "1.2rem" }} />
            </Button>
            <Button variant="white" className="p-2 border-1 shadow-sm rounded-circle">
              <FaShoppingCart style={{ color: "#9CB6BC", fontSize: "1.2rem" }} />
            </Button>
          </Col>
        </Row>
      </Container>
    
      <div className="nav-bar">
        <Nav className="justify-content-center">
          <Nav.Link as={Link} to="/Products" className="nav-items">GALLETAS</Nav.Link>
          <Nav.Link as={Link} to="/Products" className="nav-items">ALFAJORES</Nav.Link>
          <Nav.Link as={Link} to="/Products" className="nav-items ">CHOCOLATES</Nav.Link>
          <Nav.Link as={Link} to="/Products" className="nav-items">GOLOSINAS</Nav.Link>
          <Nav.Link as={Link} to="/Products" className="nav-items">BEBIDAS</Nav.Link>
          <Nav.Link as={Link} to="/Products" className="nav-items">HEALTHY</Nav.Link>
          <Nav.Link as={Link} to="/Products" className="nav-items">ALMACÉN</Nav.Link>

          {user ? (
        <>
          <Nav.Link className="logout-link" onClick={handleLogout}>CERRAR SESIÓN</Nav.Link>
        </>
          ) : (
        <>
          <Nav.Link as={Link} to="/Register" className="nav-item active nav-reg">REGISTRATE</Nav.Link>
          <Nav.Link as={Link} to="/Login" className="nav-item active nav-log">LOGIN</Nav.Link>
        </>
        )}
          <Nav.Link as={Link} to="/Contact" className="nav-item active nav-log">Contactanos</Nav.Link>
        </Nav>
      </div>
    </header>
    </div>
  )
}

export default Header