import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import './profile.css'
import userOrdersService from '../../services/userOrders'

export const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()
  const [orders, setOrders] = useState([])

  if (isLoading) {
    return <div>Loading ...</div>
  }
  
  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!isAuthenticated) return

      try {
        const token = await getAccessTokenSilently()
        const data = await userOrdersService.getAll(token)
        setOrders(data)
        console.log(data)
      } catch (error) {
        console.log('Error fetching user orders', error)
      }
    }
    fetchUserOrders()
  }, [user])

  return (
    isAuthenticated ? (
      <div id="profileInfo">
        <img src={user.picture} alt='User Picture' />
        <h2>{user.name}</h2>
        <div>Order History
          
        </div>
      </div>
    ) : (
      <div id="pleaseLogIn">
        Please log in to view your profile
      </div>
    )
  )
}