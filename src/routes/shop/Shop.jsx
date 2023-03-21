import {useContext} from 'react';

import {ProductsContext} from '../../contexts/ProductsContext';
import ProductCard from '../../components/products/ProductCard';

import Scroll from '../../components/scroll-component/Scroll';
import './shopStyles.scss';

const Shop = () => {
    const {products} = useContext(ProductsContext);
    return (
        <Scroll>
            <div className='products-container'>
                {
                    products.map((product) => (<ProductCard  key={product.id} product={product} />))
                }
            </div>
        </Scroll>
    );
};

export default Shop;