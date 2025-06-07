import React from 'react'
import '../styles/header.css'
import {FaSearch, FaEnvelope, FaShoppingCart} from 'react-icons/fa'
import {Nav, Container, Row, Col} from 'react-bootstrap'
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
          <Col xs={2} className="icon-right">
            <FaSearch className='icons' color="lightblue" />
            <FaEnvelope className='icons' color="lightblue" />
            <FaShoppingCart className='icons' color="lightblue" />
          </Col>
        </Row>
      </Container>

      <div className="nav-bar">
        <Nav className="justify-content-center">
          <Nav.Link href="#" className="nav-items ">CHOCOLATES</Nav.Link>
          <Nav.Link href="#" className="nav-items">ALFAJORES</Nav.Link>
          <Nav.Link href="#" className="nav-items">GOLOSINAS</Nav.Link>
          <Nav.Link href="#" className="nav-items">HEALTHY</Nav.Link>
          <Nav.Link href="#" className="nav-items">GASEOSAS</Nav.Link>
          <Nav.Link href="#" className="nav-items">REGALERÍA</Nav.Link>
          <Nav.Link href="#" className="nav-items">ALMACÉN</Nav.Link>

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