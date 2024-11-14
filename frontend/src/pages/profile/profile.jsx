import React, { useEffect, useState, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import './profile.css'
import userOrdersService from '../../services/userOrders'
import { ShopContext } from '../../context/shop-context'

export const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0()
  const { allProducts } = useContext(ShopContext)
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
      <div>
        <h2>Orders</h2>
        {orders.length >= 1 ? (
          <div>
            {orders.map((order) => (
              <div key={order.id} className="order">
                <p>
                  Order Date: {new Date(order.orderDate).toLocaleDateString()}
                </p>

                {order.order_details.map((detail) => (
                  <div key={detail.id} className="orderDetail">
                    <p>Product ID: {detail.productId}</p>
                    <p>Quantity: {detail.quantity}</p>
                    <p>Unit Price: ${detail.unitPrice}</p>
                    <p>Sales Tax: ${detail.salesTax}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div>You don't have any orders associated with your account.</div>
        )}
      </div>
    </div>
  ) : (
    <div id="pleaseLogIn">Please log in to view your profile</div>
  )
}
