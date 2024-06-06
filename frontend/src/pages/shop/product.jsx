import React, { useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { ShopContext } from "../../context/shop-context"

export const Product = (props) => {
    const  { id, name, unitPrice, images } = props.data
    const { addToCart, cartItems } = useContext(ShopContext)
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
        <button className="addToCartBtn" onClick={() => addToCart(id)}>
            Add To Cart {cartItems[id] > 0 && <> ({ cartItems[id] })</>}
        </button>
    </div>
  )
}
