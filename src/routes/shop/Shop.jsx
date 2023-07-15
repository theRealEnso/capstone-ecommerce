import {Routes, Route} from 'react-router-dom';
import CategoriesPreview from '../categories-preview/CategoriesPreview';
import Category from '../category/Category';

const Shop = () => {
    return (
        <Routes>
            <Route index element={<CategoriesPreview />}></Route>

            {/* :category is a placeholder variable that will contain a unique string. Placeholder variable will be used to navigate to nested routes further inside shop using Reacts useParams */}
            <Route path=':category' element={<Category />}></Route>
        </Routes>
    );
};

export default Shop;