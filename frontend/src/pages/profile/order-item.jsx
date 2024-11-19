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

  // const handleImageClick = (order_detail) => {
  //   const product = getProduct(order_detail)
  //   console.log(product, 'product')
  //   const encodedName = encodeURIComponent(product.name)
  //   console.log(encodedName, 'encodedname')
  //   navigate(`/products/${encodedName}`, { state: { product }})
  // }

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
                {order_details.map((detail) => (
                  <tr key={detail.id}>
                    <td>
                      <img
                        src={getProduct(detail).images[0].imageUrl}
                        alt="productImage"
                        className="orderDetailsImage"
                        // onClick={handleImageClick(detail)}
                        // style={{ cursor: 'pointer' }}
                      ></img>
                    </td>
                    <td>{getProduct(detail).size}</td>
                    <td>{detail.quantity}</td>
                    <td>{detail.unitPrice}</td>
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
