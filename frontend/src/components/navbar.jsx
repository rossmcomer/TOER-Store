import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import logo from '../assets/Twhitebackground.png'
import LoginButton from './loginButton'
import HamburgerMenu from './hamburgerMenu'
import { useAuth0 } from '@auth0/auth0-react'
import { ShopContext } from '../context/shop-context'

export const NavBar = () => {
  const { isAuthenticated } = useAuth0()
  const { getCartItemsCount, cartItemsCount } = useContext(ShopContext)

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="links">
        <Link to="/cart" className="cartIconContainer">
          <div className="cartIconWrapper">
            <ShoppingCart size={32} />
            {getCartItemsCount() > 0 && (
              <span className="cartItemsCount">{getCartItemsCount()}</span>
            )}
          </div>
        </Link>
        {isAuthenticated ? <HamburgerMenu /> : <LoginButton />}
      </div>
    </div>
  )
}
