import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import './profile.css'

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  

  return (
    isAuthenticated ? (
      <div id="profileInfo">
        <img src={user.picture} alt='User Picture' />
        <h2>{user.name}</h2>
        <div>Order History</div>
      </div>
    ) : (
      <div id="pleaseLogIn">
        Please log in to view your profile
      </div>
    )
  )
}