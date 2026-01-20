import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from './logoutButton'
import './hamburgerMenu.css'
import { useAuth0 } from '@auth0/auth0-react'

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth0()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  console.log(user)
  return (
    <div className="hamburgerMenuContainer">
      {/* <div className="hamburger-icon" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div> */}
      <img
        src={user.picture}
        alt="User Profile"
        className="profilePic"
        onClick={toggleMenu}
      ></img>
      <div className={`menu-options ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleMenu}>
          X
        </button>
        <Link to="/profile" id="profileBtn">
          <div>Profile</div>
        </Link>
        <LogoutButton />
        <div className="signed-in">Signed in as {user.name}</div>
      </div>
    </div>
  )
}

export default HamburgerMenu
