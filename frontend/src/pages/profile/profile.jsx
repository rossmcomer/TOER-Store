import React, { useEffect, useState, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import './profile.css'
import userOrdersService from '../../services/userOrders'
import { OrdersTable } from './orders-table'

export const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!isAuthenticated) return

      try {
        const token = await getAccessTokenSilently()

        const data = await userOrdersService.getAll(token)
        console.log('orders data in profile.jsx', data)
        setOrders(data)
      } catch (error) {
        console.log('Error fetching user orders', error)
      }
    }
    fetchUserOrders()
  }, [user])

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return isAuthenticated ? (
    <div id="profileContainer">
      <div className="userInfo">
        <img src={user.picture} alt="User Picture" className="profilePic" />
        <div>{user.name}</div>
      </div>
      <div id="ordersContainer">
        <h2>Orders</h2>
        {orders.length > 0 ? (
          <OrdersTable orders={orders} />
        ) : (
          <div>You don't have any orders associated with your account.</div>
        )}
      </div>
    </div>
  ) : (
    <div id="pleaseLogIn">Please log in to view your profile</div>
  )
}
