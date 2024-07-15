import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import logo from '../assets/Twhitebackground.png'
import LoginButton from './loginButton'
import LogoutButton from './logoutButton'
import { useAuth0 } from '@auth0/auth0-react'

export const NavBar = () => {
  const { isAuthenticated } = useAuth0()

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="links">
        <Link to="/"> Shop </Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </div>
  )
}
