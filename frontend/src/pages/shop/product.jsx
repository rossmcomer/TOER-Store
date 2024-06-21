import React from "react"
import { useNavigate } from 'react-router-dom'

export const Product = (props) => {
    const  { name, unitPrice, images } = props.data
    const navigate = useNavigate()

    const handleImageClick = () => {
      const encodedName = encodeURIComponent(name)
      navigate(`/products/${encodedName}`, { state: { product: props.data } });
    }
  return (
    <div className="product">
      <div className="product-image-container" onClick={handleImageClick}>
        <img src={images[0].imageUrl} alt=""/>
      </div>
        <div className="description">
            <p><b>{name}</b></p>
            <p>${Math.round(unitPrice)}</p>
        </div>
        <button className="addToCartBtn" onClick={handleImageClick}>
            View Product
        </button>
    </div>
  )
}
