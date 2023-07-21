//move logic to transform data into a map object in this selector. This was previously behing handled in firebase utils. This way, in case we need to do other stuff with data in the future, we can have multiple selectors that  handle different cases, or do different things with the data. Here, we will move the logic of transforming the data into a map object into a memoized selector
////////////////////////////////////////////////////////////////////////////////////


import {createSelector} from 'reselect';
//how reselect works => creates a 'memoized' selector => memoization is the process of caching the previous value of something. When a derived data selector is created using createSelector, it automatically memoizes the output. Memoization means that if the input selectors' values haven't changed since the last invocation, the selector will return the cached result instead of recomputing it. This caching mechanism improves performance by avoiding unnecessary recomputations, which in turn, avoids react components from needlessly re-rendering

const selectCategoryReducer = (state) => state.categories; // first, create an input selector that determines what our output should be. This selector function receives the entire redux store state, and then from this, slice off the categories reducer of the redux store. This is not memoized yet, but will be used in the MEMOIZED selector next

export const selectCategories = createSelector([selectCategoryReducer], (categoriesSlice) => categoriesSlice.categories); // makes a memoized selector => createSelector is a function that takes the redux store state as its input and returns a value derived from this state =>  method takes 2 arguments -- 1.) an array of any input selectors (can have multiple input selectors. These will be used to produce what the selector will ultimately return back in the output), and 2.) the result function. This result function takes the OUTPUT of the input selector (in this case it is basically state.categories) and computes the final value (Here, I am saying that, FROM the input selector, I want to extract categories from the redux store);

// only re-runs if input selector selectCategoryReducer i.e the categories from redux state actually changes or is different in value



// make another memoized selector => run this reduce only once on component mount, and do not run the reduce method unless selectCategories actually changes
export const selectCategoriesMap = createSelector([selectCategories], (categories) => categories.reduce((accumulator, category) => { // Here, I am saying I want to take the categories that we sliced off of the redux store, and perform this reduce logic with it.
    // console.log(category);
    const {title, items} = category;
    accumulator[title.toLowerCase()] = items;
    return accumulator;
    }, {})
);

//////////////////////////      OLD CODE ////////////////////////////////////////////////////////////////////////////////////////////


    // export const selectCategoriesMap = (state) => 
    // state.categories.categories.reduce((accumulator, category) => {
    //     // console.log(category);
    //     const {title, items} = category;
    //     accumulator[title.toLowerCase()] = items;
    //     return accumulator;
    // }, {});

    // // this old function always returns a new object. Since it always returns a new object, the useSelector inside the category component will always re-render because it is unable to cache the value of the new object and pass the equality check to see if the new object === previous, even though the data itself isn't really changing. Need to tackle this issue of needlessly re-rendering => fix this using reselect library