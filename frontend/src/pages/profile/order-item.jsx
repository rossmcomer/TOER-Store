import React, { useContext, useState } from 'react'
import { ShopContext } from '../../context/shop-context'
import './profile.css'

export const OrderItem = ({ id, orderDate, totalAmount, order_details }) => {
  const { allProducts } = useContext(ShopContext)
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const product = allProducts.find((p) => p.id === id)

  return (
    <>
      <tr className="orderItem">
        <td className="orderContainer">
          <div key={id} className="order">
            <p className="orderDate">
              {new Date(orderDate).toLocaleDateString()}
            </p>
            <p className="totalAmount">{totalAmount}</p>
            <button onClick={toggleExpand} aria-label="Toggle details">
              {isExpanded ? '▲' : '▼'}
            </button>
          </div>
        </td>
      </tr>

      {isExpanded && (
        <tr className="orderDetailsRow">
          <td colSpan="2">
            <table className="orderDetailsTable">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Sales Tax</th>
                </tr>
              </thead>
              <tbody>
                {order_details.map((detail) => (
                    <tr key={detail.id}>
                      <td>img</td>
                      {/* <td><img src={product.images[0].imageUrl} alt={product.name} className="ordersItemImage" /></td> */}
                      <td>{detail.quantity}</td>
                      <td>${parseFloat(detail.unitPrice).toFixed(2)}</td>
                      <td>${parseFloat(detail.salesTax).toFixed(2)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  )
}
