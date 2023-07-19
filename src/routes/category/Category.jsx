import {useState, useEffect, Fragment} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'; // allows us to get category parameter value (i.e. hats, jackets, sneakers, etc). Returns as an object

// import { CategoriesContext } from '../../contexts/CategoriesContext';

import { selectCategoriesMap } from '../../store/categories/category-selector';
import ProductCard from '../../components/products/ProductCard';

import {Title, CategoryContainer} from './category.styles.jsx';

const Category = () => {
    const {category} = useParams();
    // const {categoriesMap} = useContext(CategoriesContext); // NO LONGER USING CONTEXT, SWITCH TO REDUX.  Step 1.) First, take category name from URL...
    
    const categoriesMap = useSelector(selectCategoriesMap); // Step 2.) then use useSelector hook pull off categoriesMap from the selector
    //rather than starting useState with an empty array, we can do categoriesMap[category] because we know that categoriesMap will initially start off as an empty object, and we use this empty object as our initial state value. When data is successfully retrieved from firebase via the getCategoriesAndDocuments function, categoriesMap will eventually be a populated object containing categories and nested arrays of product data
    const [products, setProducts] = useState(categoriesMap[category]); // state is starting as an empty object

    // Step 3.) Run an effect that updates the products inside the useState with the products containing category name from the URL. This effect runs every time the category URL parameter changes, or when the categories map itself changes
    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            <CategoryContainer>
                
                {/* need safeguard here => categoriesMap fetches data asynchronously, so when app first mounts, products.map breaks because data isn't retrieved yet and will return as undefined => products && tells code to only map through products and render ProductCard components if the data is actually present */}
                {
                    products && 
                        products.map((product) => <ProductCard key={product.id} product={product} />)
                }
            </CategoryContainer>
        </Fragment>

    )
};

export default Category;