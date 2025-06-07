import React from 'react'
import Header from '../components/Header'
import MainLogin from '../components/MainLogin'
import Footer from '../components/Footer'
import { FormText } from 'react-bootstrap'

const Login = () => {
  return (
    <div>
      <Header/>
      <MainLogin/>
      <Footer/>
    </div>
  )
}

export default Login