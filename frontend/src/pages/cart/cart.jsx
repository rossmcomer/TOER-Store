import React, { useContext } from "react"
import { PRODUCTS } from "../../products"
import { ShopContext } from "../../context/shop-context"
import { CartItem } from "./cart-item"
import "./cart.css"
import { useNavigate } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js"

export const Cart = () => {
    const { cartItems, getTotalCartAmount, getCartDetailed } = useContext(ShopContext)
    const totalAmount = getTotalCartAmount()
    const cartDetailed = getCartDetailed()

    const navigate = useNavigate()

    console.log(cartDetailed, 'cartDetailed')

    const makePayment = async () => {
        const stripe = await loadStripe(`${process.env.STRIPE_KEY}`)

        const body = {
            products: cartDetailed
        }

        const headers = {
            "Content-Type":"application.json"
        }

        const response = await fetch(`${apiURL}/create-checkout-session`,{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        })

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId:session.id
        })
        
        if(result.error){
            console.log(result.error)
        }
    }

  return (
    <div className="cart">
        <div>
            <h1>Your Cart Items</h1>
        </div>
        <div className="cartItems">
            { PRODUCTS.map((product) => {
                if(cartItems[product.id] !== 0) {
                    return <CartItem data={product} key={product.id}/>
                } else {
                    return null
                }
            })}
        </div>
        {totalAmount > 0 ? (
        <div className="checkout">
            <p> Subtotal: ${totalAmount}</p>
            <button onClick={() => navigate("/")}> Continue Shopping </button>
            <button onClick={() => makePayment()}> Checkout </button>
        </div>
        ): (
            <h2> Your Cart is Empty </h2>
        )}
    </div>
  )
}
