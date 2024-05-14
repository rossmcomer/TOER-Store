import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { NavBar } from "./components/navbar"
import { Shop } from './pages/shop/shop'
import { Cart } from './pages/cart/cart'
import { Success } from './pages/success/success'
import { Cancel } from './pages/cancel/cancel';
import { ShopContextProvider } from './context/shop-context';

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
      <Router>
        <NavBar />
          <Routes>
            <Route path="/" element={<Shop/>}/>
            <Route path="/cart"element={<Cart/>}/>
            <Route path="/success"element={<Success/>}/>
            <Route path="/cancel"element={<Cancel/>}/>
          </Routes>
      </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
