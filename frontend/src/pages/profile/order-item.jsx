import React, { useContext, useState } from 'react'
import { ShopContext } from '../../context/shop-context'

export const OrderItem = ({ id, orderDate, totalAmount, order_details }) => {
  const { allProducts } = useContext(ShopContext)
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const product = allProducts.find(p => p.id === id)

  return (
    <>
        <tr className="orderItem">
        <td className="orderContainer">
            <div key={id} className="order">
                <p className='orderDate'>
                    {new Date(orderDate).toLocaleDateString()}
                </p>
                <p className='totalAmount'>
                    {totalAmount}
                </p>
                <button onClick={toggleExpand} aria-label="Toggle details">
                {isExpanded ? '▲' : '▼'}
                </button>
                {/* {order_details.map((detail) => (
                    <div key={detail.id} className="orderDetail">
                        <p>Product ID: {detail.productId}</p>
                        <p>Quantity: {detail.quantity}</p>
                        <p>Unit Price: ${detail.unitPrice}</p>
                        <p>Sales Tax: ${detail.salesTax}</p>
                    </div>
                ))} */}
            </div>
        </td>
        </tr>

        {/* {isExpanded && (
            <tr className="orderDetailsRow">
            <td colSpan="2">
                <table className="orderDetailsTable">
                <thead>
                    <tr>
                    <th>Product ID</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Sales Tax</th>
                    </tr>
                </thead>
                <tbody>
                    {order_details.map((detail) => (
                    <tr key={detail.id}>
                        <td>{detail.productId}</td>
                        <td>{detail.quantity}</td>
                        <td>${parseFloat(detail.unitPrice).toFixed(2)}</td>
                        <td>${parseFloat(detail.salesTax).toFixed(2)}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </td>
            </tr>
        )} */}
    </>
  )
}
