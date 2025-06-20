import React from "react";
import { Carousel } from "react-bootstrap";
import "../styles/MainHome.css";


const imageData = [
  { src: "https://mercadoshops.net.ar/open25/img/cat-alfajores.jpg", alt: "Alfajores", link: "/alfajores", label: "ALFAJORES" },
  { src: "https://mercadoshops.net.ar/open25/img/cat-chocolates.jpg", alt: "Chocolates", link: "/chocolates", label: "CHOCOLATES" },
  { src: "https://mercadoshops.net.ar/open25/img/cat-caramelos.jpg", alt: "Caramelos", link: "/caramelos", label: "CARAMELOS" },
  { src: "https://mercadoshops.net.ar/open25/img/cat-contigo.jpg", alt: "Contigo", link: "/contigo", label: "CONTIGO" }
];


const grouped = [];
for (let i = 0; i < imageData.length; i += 2) {
  grouped.push(imageData.slice(i, i + 2));
}




const MainHome = () => {
  return (
    <div>
      <br />
      <Carousel>
        <Carousel.Item interval={1000}>
          <a href="/Products">
            <img
              className="d-block w-100"
              src="https://http2.mlstatic.com/D_NQ_NP_748071-MLA74443330157_022024-OO.webp"
              alt="Second slide"
            />
          </a>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <a href="/Products">
            <img
              className="d-block w-100"
              src="https://http2.mlstatic.com/D_NQ_NP_759010-MLA76379051482_052024-OO.webp"
              alt="Second slide"
              href="/Products"
            />
          </a>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <a href="/Products">
            <img
              className="d-block w-100"
              src="https://http2.mlstatic.com/D_NQ_NP_776343-MLA84363044258_052025-OO.webp"
              alt="Second slide"
              href="/Products"
            />
          </a>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <br />
      <h2 className="productos-carousel-titulo">¡OFERTAS IMPERDIBLES!</h2>
      {/* Cards */}
      <br />
      <h2 className="categoria-destacada">Categorías Destacadas</h2>
      <Carousel>
      {grouped.map((pair, index) => (
        <Carousel.Item key={index}>
          <div className="carousel-duo">
            {pair.map((item, i) => (
              <div className="duo-item">
              <div className="image-wrapper">
                <img src={item.src} alt={item.alt} className="duo-img" />
                <a href={item.link} className="btn-link-inside">{item.label}</a>
              </div>
            </div>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
    <br />
    <br />
    <img  className="d-block w-100" src="https://http2.mlstatic.com/D_NQ_NP_668706-MLA81126758233_122024-OO.webp"/>
    <br />
    <h2 className="productos-carousel-titulo">¡Llegaron los TAKIS! ¿Te los vas a perder?</h2>
    </div>
  )
}

export default MainHome;