//move logic to transform data into a map object in this selector. This was previously behing handled in firebase utils. This way, in case we need to do other stuff with data in the future, we can have multiple selectors that  handle different cases, or do different things with the data. Here, we will move the logic of transforming the data into a map object into a memoized selector
////////////////////////////////////////////////////////////////////////////////////


import {createSelector} from 'reselect';
//how reselect works => creates a 'memoized' selector => memoization is the process of caching the previous value of something. When a derived data selector is created using createSelector, it automatically memoizes the output. Memoization means that if the input selectors' values haven't changed since the last invocation, the selector will return the cached result instead of recomputing it. This caching mechanism improves performance by avoiding unnecessary recomputations, which in turn, avoids react components from needlessly re-rendering

const selectCategoryReducer = (state) => state.categories; // first, create an input selector that will be used to determine what our output should be in the next step. This selector function simply receives the entire redux store state, and targets the categories reducer

export const selectCategories = createSelector([selectCategoryReducer], (categoriesSlice) => categoriesSlice.categoriesArray); // makes a memoized selector => createSelector is a function that has two arguments; First, it takes an array of input selectors (can have multiple selectors) and second is the result function. The result function RECEIVES the RESULTS of the input selectors as arguments, then performs some operation or computation on those arguments

// In this case, the result function receives the result of selectCategoryReducer(state.categories) and stores it in categoriesSlice as an argument. It then proceeds to extract the categories property/array from categoriesSlice a.k.a state.categories,  essentially doing state.categories.categories

// => selectCategories is now a memoized selector

//creating another memoized selector. This one receives the previously memoized selectCategories selector as an input. The result function for this selector receives the result of selectCategories as an argument (which again is the categoriesArray) and then proceeds to perform the reduce logic on this array
export const selectCategoriesMap = createSelector([selectCategories], (categoriesArray) => categoriesArray.reduce((accumulator, category) => { // Here, I am saying I want to take the categories that we sliced off of the redux store, and perform this reduce logic with it.
    // console.log(category);
    const {title, items} = category;
    accumulator[title.toLowerCase()] = items;
    return accumulator;
    }, {})
);

export const selectCategoriesIsLoading = createSelector([selectCategoryReducer], (categoriesSlice) => categoriesSlice.isLoading);

//////////////////////////      OLD CODE ////////////////////////////////////////////////////////////////////////////////////////////


    // export const selectCategoriesMap = (state) => 
    // state.categories.categories.reduce((accumulator, category) => {
    //     // console.log(category);
    //     const {title, items} = category;
    //     accumulator[title.toLowerCase()] = items;
    //     return accumulator;
    // }, {});

//Currently, every time this selector runs, the logic that reduces over the categories array re-runs, and returns a new net map object every time, despite the categories array never changing. Since a new net object gets returned every time, this will cause React to unnecessarily re-render components. 

// Meaning that, as it currently stands, whenever the user navigates to, away from, and back to Shop, and the Categories Preview component is rendered again, useSelector returns a new categoriesMap object every single time even though the actual data does not change, forcing React to re-render the "new" object. 

// Likewise, it is the same with the Category component--when user navigates to, away from, and then back to View More and the Category component is rendered on the screen again, useSelector returns a brand new categoriesMap object. It is unable to cache or store value and use the same cached value to avoid unnecessary re-renders. This is where the re-select library comes in