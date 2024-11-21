import React, { useState } from 'react'
import './categoryPicker.css'

const CategoryPicker = ({ categories, onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value
    setSelectedCategory(selectedValue)
    onCategorySelect(selectedValue)
  }

  return (
    <div className="categoryPicker">
      <select
        id="categoryDropdown"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="all">All Products</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CategoryPicker
