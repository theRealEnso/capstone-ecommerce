//move logic to transform data into a selector, away from previously handling it in firebase utils. This way, in case we need to do other stuff with data in the future, we can have multiple selectors handle different cases

export const selectCategoriesMap = (state) => 
    state.categories.categories.reduce((accumulator, category) => {
        // console.log(category);
        const {title, items} = category;
        accumulator[title.toLowerCase()] = items;
        return accumulator;
    }, {});

    //currently, this function always returns a new object. Since it always returns a new object, it the useSelector inside the category component will always re-render because it is unable to cache the value of the new object, pass the equality check to see if the new object === previous, even though the data itself isn't really changing. Need to tackle this issue of needlessly re-rendering