import React, { useContext } from "react"
import { ShopContext } from "../../context/shop-context"

export const CartItem = (props) => {
    const  { id, productName, price, productImage } = props.data
    const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext)
  return (
    <div className="cartItem">
        <img src={ productImage } alt="" />
        <div className="description">
            <p className="cartItemName"><b>{ productName }</b></p>
            <div className="handlePriceContainer">
              <div className="countHandler">
                  <button onClick={() => removeFromCart(id)}> - </button>
                  <input value={cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.target.value), id)}></input>
                  <button onClick={() => addToCart(id)}> + </button>
              </div>
              <p className="cartItemprice">${ price }</p>
            </div>
        </div>
    </div>
  )
}
