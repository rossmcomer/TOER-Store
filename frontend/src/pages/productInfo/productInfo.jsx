import React, { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ShopContext } from "../../context/shop-context"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './productInfo.css'

export const ProductInfo = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { allProducts, cartItems, addToCart } = useContext(ShopContext)
  const product = location.state?.product
  const [selectedProduct, setSelectedProduct] = useState(product)
  const availableProducts = allProducts.filter(item => item.name === product.name)

  const handleSizeSelect = (size) => {
    const product = availableProducts.find(p=> p.size === size )
    setSelectedProduct(product)
  }
  return (
    <div>
      <div className="back-arrow" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </div>
      <div className="productInfoWithBtn">
      <div className="product-info-container">
        <div className="productInfo">
          <div className="description">
            <p><b>{product.name}</b></p>
          </div>
          <div className='image-and-sizes'>
          <div className="product-image-container">
              {product.images.map((image, index) => (
                  <img className="productInfoImage"
                      key={index} 
                      src={image.imageUrl} 
                      alt={`${index + 1}`} 
                      width={300}
                      height={300}
                  />
              ))}
          </div>
          {product.size && (
          <div className="sizes-container">
            <button className="addToCartBtn" onClick={() => addToCart(selectedProduct.id)}>
              Add To Cart {cartItems[selectedProduct.id] > 0 && <> ({ cartItems[selectedProduct.id] })</>}
            </button>
            <div className='sizes-subContainer'>
              <div className='btnContainer'>
                {availableProducts.map((product, index) => (
                  <div key={index}>
                    <input 
                        type="radio" 
                        id={`size-${product.size}`} 
                        name="productSize" 
                        value={product.size}
                        defaultChecked={index === 0}
                        onClick={() => handleSizeSelect(product.size)}
                    />
                    <label htmlFor={`size-${index}`} className="productInfoSizeBtn">
                        {product.size}
                    </label>
                  </div>
                ))}
              </div>
              {selectedProduct && (
                <div className="unitsInStock">
                <em>({selectedProduct.unitsInStock} in Stock)</em>
                </div>
              )}
            </div>
            <div className="productInfoPrice">
              <div>${Math.round(selectedProduct.unitPrice)}</div>
            </div>
          </div>
          )}
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
