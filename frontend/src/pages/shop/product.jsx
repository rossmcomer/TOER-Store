import React, { useContext } from "react"
import { ShopContext } from "../../context/shop-context"

export const Product = (props) => {
    const  { id, name, unitPrice, images, sizes } = props.data
    const { addToCart, cartItems } = useContext(ShopContext)
  return (
    <div className="product">
        <img src={images[0].imageUrl} alt=""/>
        {sizes && sizes.length > 0 && (
                <div className="product-sizes">
                    {sizes.map((sizeInfo, index) => (
                        <label key={index} className="size-button">
                            <input
                                type="radio"
                                name={`size-${name}`}
                                value={sizeInfo.size}
                                disabled={sizeInfo.unitsInStock === 0}
                            />
                            <span className="size-text">{sizeInfo.size}</span>
                        </label>
                    ))}
                </div>
            )}
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
