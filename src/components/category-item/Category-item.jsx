import './category-item.styles.scss'
import React from 'react';

const CategoryItem = ({imageURL, title}) => {
    return (
        <div className="category-container">
          <div className="background-image" style={{backgroundImage: `url(${imageURL})`}}></div>
          <div className="category-body-container">
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
      </div>
    );
};

export default CategoryItem;