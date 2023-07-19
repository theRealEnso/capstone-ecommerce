import {Fragment} from 'react';
import {useSelector} from 'react-redux';

import { selectCategoriesMap } from '../../store/categories/category-selector';

// import { CategoriesContext } from '../../contexts/CategoriesContext';
import CategoryPreview from '../../components/category-preview/CategoryPreview';

const CategoriesPreview = () => {
    // const {categoriesMap} = useContext(CategoriesContext); // NO LONGER USING CONTEXT, SWITCH TO REDUX

    // use the useSelector hook in order to get what we need from the redux store. This hook needs a selector function. This selector function is just something that extracts off the values that we need from the entire redux store
  //inside the selector function, we receive the ENTIRE state object from redux store => from the entire state object in the redux store, we nest deeper to get the categories reducer, and then even further deeper to get the actual categoriesMap object

    // const categoriesMap = useSelector((state) => state.categories.categoriesMap);

    const categoriesMap = useSelector(selectCategoriesMap); // refactor above line using helper function
    
    return (
        <Fragment>
            {
                // Object.keys returns an array of a given object's own string-keyed property names. In this case, we get array of product titles as strings and map through them
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title]; // categoriesMap is a hash map where title is the key, and its value pair is array of products belonging to each title =>  set const products equal to array of products attached to respective title categories
                    return <CategoryPreview key={title} title={title} products={products} />
                })
            }
        </Fragment>

    );
};

export default CategoriesPreview;