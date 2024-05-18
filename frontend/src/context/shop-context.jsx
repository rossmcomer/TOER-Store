import React, { createContext, useState } from "react"
import { PRODUCTS } from "../products"
import { toast } from 'react-hot-toast'

export const ShopContext = createContext(null)

const getDefaultCart = () => {
    let cart = {}
    for (let i = 0; i < PRODUCTS.length; i++) {
        cart[i] = 0
    }
    return cart
}

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart())

    const notify = (message, type) => {
          if (type==='success'){
            toast.success(message, { id: 'clipboard', style: {minWidth: '250px', textAlign: 'center'} })
          } else if (type==='error'){
            toast.error(message, { id: 'clipboard', style: {minWidth: '250px', textAlign: 'center'} })
          }
      }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = PRODUCTS.find((product) => product.id === Number(item))
                totalAmount += cartItems[item] * itemInfo.price
            }
        }

        return totalAmount
    }

    const getCartDetailed = () => {
        let itemInfo = []
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
            let product = PRODUCTS.find((product) => product.id === Number(item))
            if (product) {
                product.quantity = cartItems[item]
                product.totalCost = product.quantity * product.price
                itemInfo.push(product);
            }
            }
        }

        return itemInfo
    }

    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1 }))
        let product = PRODUCTS.find((product) => product.id === itemId)
        notify(`${product.productName} successfully added to cart`, 'success')
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1 }))
        let product = PRODUCTS.find((product) => product.id === itemId)
        notify(`${product.productName} successfully removed from cart`, 'error')
    }

    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: newAmount }))
    }

    const contextValue = { cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount, getCartDetailed }

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
}
