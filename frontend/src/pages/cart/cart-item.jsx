import React, { useContext } from "react"
import { ShopContext } from "../../context/shop-context"

export const CartItem = (props) => {
    const  { id, productName, price, productImage } = props.data
    const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext)
  
    const quantity = cartItems[id]
    const subtotal = price * quantity
  
    return (
    <tr className="cartItem">
        <td className="description">
            <img src={productImage} alt={productName} className="cartItemImage" />
            <span className="cartItemName"><b>{productName}</b></span>
        </td>
        <td className="cartItemprice">${price}</td>
        <td>
            <div className="countHandler">
                <button onClick={() => removeFromCart(id)}>
                    -
                </button>
                <input value={cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.target.value), id)} />
                <button onClick={() => addToCart(id)}>
                    +
                </button>
            </div>
        </td>
        <td className="cartItemSubtotal">${subtotal}</td>
    </tr>
  )
}
