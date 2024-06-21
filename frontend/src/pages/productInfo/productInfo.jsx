import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ShopContext } from "../../context/shop-context"
import productService from '../../services/products'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const ProductInfo = () => {
  const { allProducts, cartItems, addToCart } = useContext(ShopContext)
  const location = useLocation()
  const navigate = useNavigate()
  const product = location.state?.product
  console.log(product, 'productRendered')
  const availableProducts = allProducts.filter(item => item.name === product.name)
  console.log(availableProducts, 'availableproducts')
  return (
    <div className="product-info-container">
      <div className="back-arrow" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </div>
    <div>{product.name}</div>
    <div>${Math.round(product.unitPrice)}</div>
    <div id="image-container">
        {product.images.map((image, index) => (
            <img className="productInfoImage"
                key={index} 
                src={image.imageUrl} 
                alt={`Product Image ${index + 1}`} 
                width={300}
                height={300}
            />
        ))}
    </div>
    <div>Available Sizes</div>
    <div id="sizes-container">
        {availableProducts.map((product, index) => (
          <>
            <button className="productInfoSizeBtn"key={index}>{product.size}</button>
            <div>Units Available: {product.unitsInStock}</div>
          </>
        ))}
    </div>
    <button className="addToCartBtn" onClick={() => addToCart(product.id)}>
            Add To Cart {cartItems[product.id] > 0 && <> ({ cartItems[product.id] })</>}
        </button>
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
