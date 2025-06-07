import React from 'react' 
import { Carousel} from 'react-bootstrap'
import "../styles/MainHome.css"

const MainHome = () => {
  return (
    <div>
      <br/>
      <Carousel>
            <Carousel.Item interval={1000}>
            <img
                className="d-block w-100"
                src= "https://infokioscos.com.ar//wp-content/uploads22/rasta-alfajores.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
            <img
                className="d-block w-100"
                src= "https://resizer.iproimg.com/unsafe/1280x/filters:format(webp)/https://assets.iproup.com/assets/jpg/2020/06/10451.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>
                
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src= "https://sure.com.ar/wp-content/uploads/2024/03/sure_bagley_rellenas_01-1024x576.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>
                
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
    </div>
  )
}

export default MainHome