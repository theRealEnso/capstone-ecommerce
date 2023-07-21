import { createAction } from "../../utilities/reducer.utilities";
import { CART_ACTION_TYPES } from "./cart-types";

const addCartItem = (cartItems, productToAdd) => {
    const itemInCart = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if(itemInCart){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
    };

    return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    const itemInCart = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    if(itemInCart.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);

    };

    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
};


const deleteCartItem = (cartItems, cartItemToDelete) => {
    const itemInCart = cartItems.find(cartItem => cartItem.id === cartItemToDelete.id);
    
    if(itemInCart){
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToDelete.id);
    };
};

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = (addCartItem(cartItems, productToAdd));
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = (removeCartItem(cartItems, cartItemToRemove));
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const deleteItemFromCart = (cartItems, cartItemToDelete) => {
    const newCartItems = (deleteCartItem(cartItems, cartItemToDelete));
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

// const createAction = (type, payload) => ({type, payload});
