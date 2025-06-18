import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/footer.css";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div>
      <footer className="custom-footer text-white">
        <Container fluid>
          <Row className="py-5">
            <Col md={3} className="mb-4 mb-md-0 text-center text-md-start">
              <img src={logo} alt="Logo" className="footer-logo mb-3" />
              <p>La cadena de #drugstores más importante de Argentina.</p>
              <p>
                Más de 200 sucursales
                <br />
                #SiempreHayUnoCerca
              </p>
            </Col>

            <Col md={3} className="mb-4 mb-md-0">
              <ul className="footer-links">
                <li>
                  <a href="#">CHOCOLATES</a>
                </li>
                <li>
                  <a href="#">ALFAJORES</a>
                </li>
                <li>
                  <a href="#">CARAMELOS</a>
                </li>
                <li>
                  <a href="#">CHICLES</a>
                </li>
              </ul>
            </Col>

            <Col md={2} className="mb-4 mb-md-0">
              <ul className="footer-links">
                <li>
                  <a href="#">HEALTHY</a>
                </li>
                <li>
                  <a href="#">BEBIDAS</a>
                </li>
                <li>
                  <a href="#">ALMACÉN</a>
                </li>
              </ul>
            </Col>

            <Col md={4}>
              <h6 className="fw-bold">SUSCRIBITE AL NEWSLETTER</h6>
              <p>Para recibir novedades y ofertas especiales.</p>
              <div className="footer-contact mt-4">
                <div className="social-icons mb-3">
                  <i className="bi bi-instagram"></i>
                  <i className="bi bi-facebook"></i>
                  <i className="bi bi-twitter-x"></i>
                  <i className="bi bi-youtube"></i>
                </div>
                <p>
                  Tel: 1223334444
                  <br />
                  ecommerce@open25.com.ar
                  <br />
                  Florida 537 CABA Buenos Aires
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
