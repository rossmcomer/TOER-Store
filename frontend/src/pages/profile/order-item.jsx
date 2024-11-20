import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../../context/shop-context'
import './profile.css'

export const OrderItem = ({ id, orderDate, totalAmount, order_details }) => {
  const { allProducts } = useContext(ShopContext)
  const [isExpanded, setIsExpanded] = useState(false)
  const navigate = useNavigate()

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const getProduct = (order_detail) => {
    const product = allProducts.find((p) => p.id === order_detail.productId)
    return product
  }

  return (
    <>
      <tr
        className={`orderItem ${isExpanded ? 'expanded' : ''}`}
        aria-expanded={isExpanded}
        onClick={toggleExpand}
      >
        <td>{id}</td>
        <td>{new Date(orderDate).toLocaleDateString()}</td>
        <td>${totalAmount}</td>
      </tr>

      {isExpanded && (
        <tr className="orderDetailsRow">
          <td>
            <table className="orderDetailsTable">
              <thead>
                <tr className="orderDetailsTableHeader">
                  <th>Product</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>$</th>
                </tr>
              </thead>
              <tbody>
                {order_details.map((detail) => {
                  const product = getProduct(detail)
                  return (
                    <tr key={detail.id}>
                      <td>
                        <img
                          src={product.images[0].imageUrl}
                          alt="productImage"
                          className="orderDetailsImage"
                          onClick={() =>
                            navigate(
                              `/products/${encodeURIComponent(product.name)}`,
                              { state: { product: product } },
                            )
                          }
                          style={{ cursor: 'pointer' }}
                        ></img>
                      </td>
                      <td>{getProduct(detail).size}</td>
                      <td>{detail.quantity}</td>
                      <td>{detail.unitPrice}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  )
}
