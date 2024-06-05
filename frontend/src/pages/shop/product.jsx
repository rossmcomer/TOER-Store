import React, { useContext } from "react"
import { ShopContext } from "../../context/shop-context"
import { Button } from 'react-bootstrap'

export const Product = (props) => {
    const  { id, name, unitPrice, images, sizes } = props.data
    const { addToCart, cartItems } = useContext(ShopContext)
  return (
    <div className="product">
        <img src={images[0].imageUrl} alt=""/>
        <div className="product-sizes">
            {sizes.map((sizeInfo, index) => (
                <Button
                    key={index}
                    variant={sizeInfo.units_in_stock > 0 ? 'primary' : 'secondary'}
                    disabled={sizeInfo.units_in_stock === 0}
                >
                    {sizeInfo.size} ({sizeInfo.units_in_stock} in stock)
                </Button>
            ))}
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
