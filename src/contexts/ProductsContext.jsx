import {useState, createContext} from 'react';

import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
    products: [],

});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS); // set default state to hard coded products array from shop-data.json
    const value = {products}; // export products as an object
    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    );
};