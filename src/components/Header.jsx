import React from 'react'
import '../styles/header.css'
import {FaSearch, FaShoppingCart} from 'react-icons/fa'
import {Nav, Container, Row, Col, Button} from 'react-bootstrap'
import logo from '../assets/logo.png'

const Header = () => {

  

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
          <Nav.Link href="/Products" className="nav-items ">CHOCOLATES</Nav.Link>
          <Nav.Link href="/Products" className="nav-items">ALFAJORES</Nav.Link>
          <Nav.Link href="/Products" className="nav-items">GOLOSINAS</Nav.Link>
          <Nav.Link href="/Products" className="nav-items">HEALTHY</Nav.Link>
          <Nav.Link href="/Products" className="nav-items">BEBIDAS</Nav.Link>
          <Nav.Link href="/Products" className="nav-items">REGALERÍA</Nav.Link>
          <Nav.Link href="/Products" className="nav-items">ALMACÉN</Nav.Link>

          <Nav.Link href="/Register" className="nav-item active nav-reg">REGISTRATE</Nav.Link>
          <Nav.Link href="/Login" className="nav-item active nav-log">LOGIN</Nav.Link>
          <Nav.Link href="/Contact" className="nav-item active nav-log">Contactanos</Nav.Link>
        </Nav>
      </div>
    </header>
    </div>
  )
}

export default Header