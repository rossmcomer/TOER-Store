import React, { useContext } from "react"
import { ShopContext } from "../../context/shop-context"

export const CartItem = (props) => {
    const  { id, name, unitPrice, images } = props.data
    const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext)
  
    const quantity = cartItems[id]
    const subtotal = unitPrice * quantity
  
    return (
    <tr className="cartItem">
        <td className="description">
            <img src={images[0].imageUrl} alt={name} className="cartItemImage" />
            <span className="cartItemName"><b>{name}</b> - ${unitPrice}</span>
        </td>
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
