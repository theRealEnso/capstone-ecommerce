import {useContext} from 'react';

import {ProductsContext} from '../../contexts/ProductsContext';
import ProductCard from '../../components/products/ProductCard';
import './shopStyles.scss';

const Shop = () => {
    const {products} = useContext(ProductsContext);
    return (
        <div className='products-container'>
            {
                products.map((product) => (<ProductCard  key={product.id} name={product.name} id={product.id} price={product.price} imageURL={product.imageUrl} />))
            }
        </div>
    );
};

export default Shop;