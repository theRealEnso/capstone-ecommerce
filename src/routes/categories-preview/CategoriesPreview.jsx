import {useContext, Fragment} from 'react';

import { CategoriesContext } from '../../contexts/CategoriesContext';
import CategoryPreview from '../../components/category-preview/CategoryPreview';

const CategoriesPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext);
    return (
        <Fragment>
            {
                // Object.keys returns an array of a given object's own string-keyed property names. In this case, we get array of product titles as strings and map through them
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title]; // categoriesMap is a hash map where title is the key, and its value pair is array of products belonging to each title.set const products equal to array of products attached to respective title categories
                    return <CategoryPreview key={title} title={title} products={products} />
                })
            }
        </Fragment>

    );
};

export default CategoriesPreview;