import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShopContext } from "../../context/shop-context"
import productService from '../../services/products'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const ProductInfo = () => {
  const { products, cartItems, addToCart } = useContext(ShopContext)
  const { name } = useParams()
  const navigate = useNavigate()
  return (
    <div className="product-info-container">
      <div className="back-arrow" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </div>
    <div>ProductInfo</div>
    <div>Available Sizes</div>
    {/* {sizes && sizes.length > 0 && (
              <div className="product-sizes">
                  {sizes.map((sizeInfo, index) => (
                      <label key={index} className="size-button">
                          <input
                              type="radio"
                              name={`size-${name}`}
                              value={sizeInfo.size}
                              disabled={sizeInfo.unitsInStock === 0}
                          />
                          <span className="size-text">{sizeInfo.size}</span>
                      </label>
                  ))}
              </div>
          )} */}
    </div>
  )
}
