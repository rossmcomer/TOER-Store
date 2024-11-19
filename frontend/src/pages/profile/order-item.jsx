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
      <tr
        className={`orderItem ${isExpanded ? 'expanded' : ''}`}
        aria-expanded={isExpanded}
        onClick={toggleExpand}
      >
        <td>{new Date(orderDate).toLocaleDateString()}</td>
        <td>{totalAmount}</td>
      </tr>

      {isExpanded && (
        <tr className="orderDetailsRow">
          <td>
            <table className="orderDetailsTable">
              <thead>
                <tr className="orderDetailsTableHeader">
                  <th>Product</th>
                  <th>Qty</th>
                  <th>$</th>
                  <th>Tax</th>
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
