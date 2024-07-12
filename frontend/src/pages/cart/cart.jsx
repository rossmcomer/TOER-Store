import React, { useContext } from "react"
import { ShopContext } from "../../context/shop-context"
import { CartItem } from "./cart-item"
import "./cart.css"
import { useNavigate } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js"
import checkoutService from '../../services/checkout.js'

export const Cart = () => {
    const { allProducts, cartItems, getTotalCartAmount, getCartDetailed } = useContext(ShopContext)
    const totalAmount = getTotalCartAmount()
    const cartDetailed = getCartDetailed()
    console.log(totalAmount, cartDetailed, 'cart')

    const navigate = useNavigate()

    const makePayment = async () => {
        const stripe = await loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`)

        const body = {
            products: cartDetailed
        }

        const session = await checkoutService.checkout(body)

        const result = stripe.redirectToCheckout({
            sessionId:session.id
        })

        if (result.error) {
            console.log(result.error, 'result error');
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
                    <tr>
                        <th className="leftAlign">Product</th>
                        <th className="quantity">Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                { allProducts.map((product) => {
                    if(cartItems[product.id] !== 0) {
                        return <CartItem data={product} key={product.id}/>
                    } else {
                        return null
                    }
                })}
                </tbody>
                </table>
            </div>
            <div className="checkout">
                <p> <b>Total: ${totalAmount} (Taxes not included)</b></p>
                <div className="buttonContainer">
                <button onClick={() => navigate("/")}> Continue Shopping </button>
                <button onClick={makePayment}> Checkout </button>
                </div>
            </div>
        </>
        ): (
            <div className="checkout">
                <h2> Your Cart is Empty </h2>
                <div className="buttonContainer">
                    <button onClick={() => navigate("/")}> Continue Shopping </button>
                </div>
            </div>
        )}
    </div>
  )
}
