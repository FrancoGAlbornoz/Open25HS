import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import Error from './pages/Error'
import {home, aboutus, contact, register, login, products} from './routes/path'
import ViewProduct from './components/Product/ViewProduct'
import CreateProduct from './components/Product/CreateProduct'
import EditProduct from './components/Product/EditProduct'
import Products from './pages/Products'
import './App.css'




function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path={home} element={<Home/>}/>
          <Route path={aboutus} element={<AboutUs/>}/>
          <Route path={contact} element={<Contact/>}/>
          <Route path={register} element={<Register/>}/>
          <Route path={login} element={<Login/>}/>
          <Route path={products} element={<Products/>}/>
          <Route path="/products/view/:id" element={<ViewProduct />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct/>} />
          
          <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
