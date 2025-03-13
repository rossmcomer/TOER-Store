import React, { useState } from 'react'
import './categoryPicker.css'

const CategoryPicker = ({ categories, onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
    setIsOpen(false);
  };

  return (
    <div className="categoryPicker">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
          {selectedCategory === 'all' ? 'Filter Products' : selectedCategory}
        <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          <li onClick={() => handleSelect('all')}>All</li>
          {categories.map((category) => (
            <li key={category.id} onClick={() => handleSelect(category.name)}>
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryPicker
