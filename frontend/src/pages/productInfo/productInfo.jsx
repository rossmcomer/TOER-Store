import React, { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ShopContext } from '../../context/shop-context'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import './productInfo.css'

export const ProductInfo = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { allProducts, cartItems, addToCart, notify } = useContext(ShopContext)
  const product = location.state?.product
  const [selectedProduct, setSelectedProduct] = useState(product)
  const availableProducts = allProducts.filter(
    (item) => item.name === product.name,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0]?.imageUrl || '',
  )

  const handleSizeSelect = (size) => {
    const product = availableProducts.find((p) => p.size === size)
    setSelectedProduct(product)
  }

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }
  return (
    <div>
      <div className="back-arrow" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </div>
      <div className="productInfoWithBtn">
        <div className="product-info-container">
          {isModalOpen && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content">
                <img
                  src={selectedImage}
                  alt="Blown-up Product"
                  className="modal-image"
                />
              </div>
            </div>
          )}
          <div className="productInfo">
            <div className="description">
              <p>
                <b>{product.name}</b>
              </p>
            </div>
            <div className="image-and-sizes">
              <div className="productInfo-image-container">
                {product.images.length > 0 && (
                  <img
                    className="productInfoImage"
                    src={product.images[0].imageUrl}
                    alt="Product Image"
                    width={300}
                    height={300}
                    onClick={() => handleImageClick(product.images[0].imageUrl)}
                  />
                )}
              </div>
              <div className="sizes-container">
                <button
                  className="addToCartBtn"
                  onClick={() => {
                    if (
                      selectedProduct.unitsInStock -
                        cartItems[selectedProduct.id] <=
                      0
                    ) {
                      notify(
                        `Cannot add more items. Only ${selectedProduct.unitsInStock} items are left in stock.`,
                        'error',
                      )
                    } else {
                      addToCart(selectedProduct.id)
                    }
                  }}
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
                              disabled={product.unitsInStock === 0}
                            />
                            <label
                              htmlFor={`${product.size}`}
                              onClick={() => {
                                if (product.unitsInStock > 0)
                                  handleSizeSelect(product.size)
                              }}
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
                      <em>{selectedProduct.unitsInStock} in Stock</em>
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
