import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { CartProvider } from './components/CartContext/CartContext'

function Layout() {
  return (
    <CartProvider>
      <Header/>
      <Outlet/>
      <Footer/>
    </CartProvider>
  )
}

export default Layout