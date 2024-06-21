import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ShopContext } from "../../context/shop-context"
import productService from '../../services/products'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
                  alt={`${index + 1}`} 
                  width={300}
                  height={300}
              />
          ))}
      </div>
      {product.size && (
      <div>
        <div>Available Sizes</div>
        <div id="sizes-container">
          {availableProducts.map((product, index) => (
            <div key={index}>
              <input 
                  type="radio" 
                  id={`size-${product.size}`} 
                  name="productSize" 
                  value={product.size}
                  onClick={() => handleSizeSelect(product.size)}
              />
              <label htmlFor={`size-${index}`} className="productInfoSizeBtn">
                  {product.size}
              </label>
              <div>Units Available: {product.unitsInStock}</div>
            </div>
          ))}
        </div>  
      </div>
      )}
      <button className="addToCartBtn" onClick={() => addToCart(selectedProduct.id)}>
        Add To Cart {cartItems[selectedProduct.id] > 0 && <> ({ cartItems[selectedProduct.id] })</>}
      </button>
    </div>
  )
}
