import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../../context/shop-context'
import { Product } from './product'
import CategoryPicker from '../../components/categoryPicker'
import './shop.css'

export const Shop = () => {
  const { products, loading, categories } = useContext(ShopContext)
  const [categorizedProducts, setCategorizedProducts] = useState([])

  useEffect(() => {
    if (products && products.length > 0) {
      setCategorizedProducts(products)
    }
  }, [products])

  if (loading) {
    return <div>Loading...</div>
  }

  const handleCategorySelect = (category) => {
    if (category === 'all') {
      setCategorizedProducts(products)
    } else {
      setCategorizedProducts(
        products.filter((p) => p.category.name === category),
      )
    }
  }

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>TOER Store</h1>
      </div>
      <CategoryPicker
        categories={categories}
        onCategorySelect={handleCategorySelect}
      />
      <div className="products">
        {categorizedProducts.map((product) => (
          <Product data={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}
