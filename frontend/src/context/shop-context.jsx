import React, { createContext, useState, useEffect } from "react"
import { toast } from 'react-hot-toast'
import productService from '../services/products'

export const ShopContext = createContext(null)

const getDefaultCart = (products) => {
    let cart = {};
    products.forEach(product => {
        cart[product.id] = 0;
    });
    return cart;
}

export const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [loading, setLoading] = useState(true)
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        const fetchproducts = async () => {
            try {
                const data = await productService.getAll()
                const groupedProducts = groupProductsByName(data)
                setAllProducts(data)
                setProducts(groupedProducts)
                setCartItems(getDefaultCart(data))
                setLoading(false)
            } catch (error) {
                console.error('Error fetching products:', error)
                setLoading(false)
            }
        };
        fetchproducts()
    }, [])

    const groupProductsByName = (products) => {
        const groupedProducts = products.reduce((acc, product) => {
            if (!acc[product.name]) {
                acc[product.name] = {
                    ...product
                };
            }
            return acc;
        }, {});
        return Object.values(groupedProducts);
      };

    const notify = (message, type) => {
          if (type==='success'){
            toast.success(message, { id: 'clipboard', style: {minWidth: '250px', textAlign: 'center'} })
          } else if (type==='error'){
            toast.error(message, { id: 'clipboard', style: {minWidth: '250px', textAlign: 'center'} })
          }
      }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                let itemInfo = allProducts.find((product) => product.id === Number(itemId))
                totalAmount += cartItems[itemId] * itemInfo.unitPrice
            }
        }

        return totalAmount
    }

    const getCartDetailed = () => {
        let itemInfo = []
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
            let product = allProducts.find((product) => product.id === Number(itemId))
            if (product) {
                product.quantity = cartItems[itemId]
                product.totalCost = product.quantity * product.unitPrice
                itemInfo.push(product);
            }
            }
        }

        return itemInfo
    }

    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1 }))
        let product = allProducts.find((product) => product.id === itemId)
        notify( product.size ? `${product.name} (Size: ${product.size}) successfully added to cart` : `${product.name} successfully added to cart`, 'success')
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1 }))
        let product = allProducts.find((product) => product.id === itemId)
        notify( product.size ? `${product.name} (Size: ${product.size}) successfully removed from cart` : `${product.name} successfully removed from cart`, 'error')
    }

    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: newAmount }))
    }

    const contextValue = { products, allProducts, loading, cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount, getCartDetailed }

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
}
