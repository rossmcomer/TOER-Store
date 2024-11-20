import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from './logoutButton'
import './hamburgerMenu.css'

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
    setIsOpen(!isOpen)
    }
    return (
        <div className="hamburgerMenuContainer">
          <div className="hamburger-icon" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
    
          {isOpen && (
            <div className="menu-options">
                <Link to="/profile" id="profileBtn">
                    <div>Profile</div>
                </Link>
                <LogoutButton />
            </div>
          )}
        </div>
      )
}

export default HamburgerMenu
