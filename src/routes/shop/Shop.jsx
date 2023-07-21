import {Routes, Route} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import CategoriesPreview from '../categories-preview/CategoriesPreview';
import Category from '../category/Category';

import { getCategoriesAndDocuments } from '../../utilities/firebase/firebaseUtilities';
import { setCategories } from '../../store/categories/category-actions';

const Shop = () => {
    const dispatch = useDispatch();

    //moving over to redux. No longer using Categories Provider / Categories Context. Need to get categories another way. Paste previous useEffect code from previous user context file here. Bring in useDispatch hook from redux because we still need to dispatch the action
  useEffect(() => {
    const getCategoriesMap = async () => {
        const categoriesArray = await getCategoriesAndDocuments(); // modified this function in firebase utils to just get general data (array of 5 giant product objects) instead of fully returning a map object
        console.log(categoriesArray);
        dispatch(setCategories(categoriesArray));
    };

    getCategoriesMap();
    
  }, [dispatch]); // technically just running this function once. Dependency array in useEffect will throw linter error if left empty

    return (
        <Routes>
            <Route index element={<CategoriesPreview />}></Route>

            {/* :category is a placeholder variable that will contain a unique string. Placeholder variable will be used to navigate to nested routes further inside shop using Reacts useParams */}
            <Route path=':category' element={<Category />}></Route>
        </Routes>
    );
};

export default Shop;