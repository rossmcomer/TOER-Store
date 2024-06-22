import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { NavBar } from "./components/navbar"
import { Shop } from './pages/shop/shop'
import { Cart } from './pages/cart/cart'
import { Success } from './pages/success/success'
import { Cancel } from './pages/cancel/cancel'
import { ShopContextProvider } from './context/shop-context'
import { Toaster } from 'react-hot-toast'
import { ThemeToggle } from "./components/themeToggle"
import { ProductInfo } from './pages/productInfo/productInfo'

function App() {  

  return (
    <ShopContextProvider>
    <div className="App">
      <Router>
        <NavBar />
        <ThemeToggle/>
        <Toaster />
          <Routes>
            <Route path="/" element={<Shop/>}/>
            <Route path="/cart"element={<Cart/>}/>
            <Route path="/success"element={<Success/>}/>
            <Route path="/cancel"element={<Cancel/>}/>
            <Route path="/products/:id"element={<ProductInfo/>}/>
          </Routes>
      </Router>
    </div>
    </ShopContextProvider>
  );
}

export default App;
