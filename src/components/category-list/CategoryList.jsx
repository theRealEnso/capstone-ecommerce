import React from 'react';
import CategoryItem from "../category-item/CategoryItem";
import './Category-list.styles.scss';

const CategoryList = ({categories}) => {

    return (
        <div className='categories-container'>
            {categories.map((category) => (<CategoryItem key={category.id} title={category.title} imageURL={category.imageUrl}/>))}
        </div>
    );
};

export default CategoryList;