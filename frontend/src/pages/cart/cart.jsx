import React, { useContext } from 'react'
import { ShopContext } from '../../context/shop-context'
import { CartItem } from './cart-item'
import './cart.css'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import checkoutService from '../../services/checkout.js'
import { useAuth0 } from '@auth0/auth0-react'

export const Cart = () => {
  const { user, isAuthenticated } = useAuth0()
  const { allProducts, cartItems, getTotalCartAmount, getCartDetailed } =
    useContext(ShopContext)
  const totalAmount = getTotalCartAmount()
  const cartDetailed = getCartDetailed()

  const navigate = useNavigate()

  const makePayment = async () => {
    const oktaUserId = user.sub
    const stripe = await loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`)

    const body = {
      products: cartDetailed,
      oktaUserId: oktaUserId
    }

    const session = await checkoutService.checkout(body)

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    })

    if (result.error) {
      console.log(result.error, 'result error')
    }
  }

  const makePaymentAsGuest = async () => {
    const stripe = await loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`)

    const body = {
      products: cartDetailed,
      oktaUserId: null
    }

    const session = await checkoutService.checkout(body)

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    })

    if (result.error) {
      console.log(result.error, 'result error')
    }
  }

  return (
    <div className="cart">
      {totalAmount > 0 ? (
        <>
          <div>
            <h1>Your Cart Items</h1>
          </div>
          <div className="cartItems">
            <table className="cartItemsTable">
              <thead>
                <tr className="headerRow">
                  <th className="productHeader">Product</th>
                  <th className="qtySubtotalWrap">
                    <div className="quantity">Qty</div>
                    <div className="subtotal">$</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map((product) => {
                  if (cartItems[product.id] !== 0) {
                    return <CartItem data={product} key={product.id} />
                  } else {
                    return null
                  }
                })}
              </tbody>
            </table>
          </div>
          <div className="checkout">
            <div className="cartTotal">
              <p className="total">
                <b>Total: ${totalAmount} </b>
              </p>{' '}
              <p className="taxesNotIncluded">(Taxes not included)</p>
            </div>
            <div className="buttonContainer">
              <button onClick={() => navigate('/')}> Continue Shopping </button>
              {isAuthenticated ? (
                <button onClick={makePayment}>Checkout</button>
              ) : (
                <button onClick={makePaymentAsGuest}>Checkout as Guest</button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="checkout">
          <h2> Your Cart is Empty </h2>
          <div className="buttonContainer">
            <button onClick={() => navigate('/')}> Continue Shopping </button>
          </div>
        </div>
      )}
    </div>
  )
}
