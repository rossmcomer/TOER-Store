import React, { useContext } from 'react'
import { ShopContext } from '../../context/shop-context'
import { Product } from './product'
import './shop.css'

export const Shop = () => {
  const { products, loading } = useContext(ShopContext)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>TOER Store</h1>
      </div>
      <div className="products">
        {products.map((product) => (
          <Product data={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}
