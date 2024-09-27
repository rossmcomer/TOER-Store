import React, { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ShopContext } from '../../context/shop-context'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import './productInfo.css'

export const ProductInfo = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { allProducts, cartItems, addToCart } = useContext(ShopContext)
  const product = location.state?.product
  const [selectedProduct, setSelectedProduct] = useState(product)
  const availableProducts = allProducts.filter(
    (item) => item.name === product.name,
  )

  const handleSizeSelect = (size) => {
    const product = availableProducts.find((p) => p.size === size)
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
              <p>
                <b>{product.name}</b>
              </p>
            </div>
            <div className="image-and-sizes">
              <div className="product-image-container">
                {product.images.map((image, index) => (
                  <img
                    className="productInfoImage"
                    key={index}
                    src={image.imageUrl}
                    alt={`${index + 1}`}
                    width={300}
                    height={300}
                  />
                ))}
              </div>
              <div className="sizes-container">
                <button
                  className="addToCartBtn"
                  onClick={() => addToCart(selectedProduct.id)}
                >
                  Add To Cart{' '}
                  {cartItems[selectedProduct.id] > 0 && (
                    <> ({cartItems[selectedProduct.id]})</>
                  )}
                </button>
                <div>
                  {product.size && (
                    <div className="sizes-subContainer">
                      <div className="btnContainer">
                        {availableProducts.map((product, index) => (
                          <div key={index} className="productSizeContainer">
                            <input
                              type="radio"
                              id={`${product.size}`}
                              name="productSize"
                              className="productSizeInput"
                              value={product.size}
                              checked={product.size === selectedProduct.size}
                              readOnly={true}
                            />
                            <label
                              htmlFor={`size-${index}`}
                              onClick={() => handleSizeSelect(product.size)}
                            >
                              <span>{product.size}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedProduct.unitsInStock > 0 ? (
                    <div className="unitsInStock">
                      <em>In Stock</em>
                    </div>
                  ) : (
                    <div className="unitsInStock">
                      <em>Out of Stock</em>
                    </div>
                  )}
                </div>
                <div className="productInfoPrice">
                  <div>${Math.round(selectedProduct.unitPrice)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
