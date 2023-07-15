//NOTE TO SELF: commented out code is commented out because we wanted to store data contained in shop-data.js to firebase. First, we imported the data from the file, and then used a useEffect to run the addCollectionAndDocuments function in order to add data to firebase db. Once data is added, we block it out because everytime the app runs, the useEffect will try and set new values inside the db, which is not what we want to do. In short, only wanted to use addCollectionAndDocuments once to load data into db, and then delete the function and the useEffect

import {useState, useEffect, createContext} from 'react';
import { getCategoriesAndDocuments } from '../utilities/firebase/firebaseUtilities';
// import { addCollectionAndDocuments } from '../utilities/firebase/firebaseUtilities.js';
// import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    //get data one time when app mounts
    //note: recall that getCategoriesAndDocuments is an async function that returns a promise. We cannot call async functions directly inside a useEffect. Must create new async function and nest it inside new async function, and then call it afterwards
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        };

        getCategoriesMap();
        
    }, []);

    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, [])

    const value = {categoriesMap}; // export categoriesMap as an object hash table
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    );
};