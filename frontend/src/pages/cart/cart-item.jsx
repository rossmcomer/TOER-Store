import React, { useContext } from 'react'
import { ShopContext } from '../../context/shop-context'

export const CartItem = (props) => {
  const { id, name, unitPrice, images, size, unitsInStock } = props.data
  const { cartItems, addToCart, removeFromCart, updateCartItemCount, notify } =
    useContext(ShopContext)

  const quantity = cartItems[id]
  const subtotal = unitPrice * quantity

  return (
    <tr className="cartItem">
      <td className="description">
        <img src={images[0].imageUrl} alt={name} className="cartItemImage" />
        {size ? (
          <div className="cartItemName">
            <b>{name}</b> - Size {size} - ${unitPrice}
          </div>
        ) : (
          <div className="cartItemName">
            <b>{name}</b> - ${unitPrice}
          </div>
        )}
      </td>
      <td className="counterContainer">
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}>-</button>
          <input
            value={cartItems[id]}
            onChange={(e) => {
              const newValue = Number(e.target.value)

              if (newValue > unitsInStock) {
                notify(
                  `Cannot add more items. Only ${unitsInStock} items are left in stock!`,
                  'error',
                )

                updateCartItemCount(cartItems[id], id)
              } else if (newValue >= 0) {
                updateCartItemCount(newValue, id)
              }
            }}
          />
          <button
            onClick={() => {
              if (unitsInStock - cartItems[id] <= 0) {
                notify(
                  `Cannot add more items. Only ${unitsInStock} items are left in stock.`,
                  'error',
                )
              } else {
                addToCart(id)
              }
            }}
          >
            +
          </button>
        </div>

        <div className="cartItemSubtotal">${subtotal}</div>
      </td>
    </tr>
  )
}
