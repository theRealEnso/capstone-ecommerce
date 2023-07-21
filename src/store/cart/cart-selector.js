import {createSelector} from 'reselect';

const selectCartReducer = (state) => state.cart; // pull off cart reducer from redux store

export const selectCartItems = createSelector([selectCartReducer], (cartSlice) => cartSlice.cartItems); // pull off cart items from cart reducer and memoize it

export const selectIsCartOpen = createSelector([selectCartReducer], (cartSlice) => cartSlice.isCartOpen); // pull off isCartOpen from cart reducer and memoize it

export const selectCartCount = createSelector([selectCartItems], (cartItems) => // handle logic that reduces over cart items array and gets the cart count + memoizes it
    cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0))

export const selectCartTotal = createSelector([selectCartItems], (cartItems) => // handle logic that reduces over cart items array and gets the total + memoizes it
    cartItems.reduce((accumulator, cartItem) => accumulator + (cartItem.price * cartItem.quantity), 0));
