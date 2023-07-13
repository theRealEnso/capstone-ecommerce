import { startAfter } from 'firebase/firestore';
import {createContext, useReducer} from 'react';

// product {id, name, price, imageUrl}
// Cart item has same structure as product but has an additional quantity field => {id, name, price, imageUrl, quantity}

const addCartItem = (cartItems, productToAdd) => { //helper function accepts 2 arguments. First is the current state of cartItems array of objects. Second argument is product to add, which ends up being the product object with id, name, price, and imageUrl being passed in
    // find if cartItems contains an element that matches productToAdd's ID. The find method runs once for each element in the array until it returns a truthy value, then returns that element and stops iterating through the array
    const itemInCart = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    //if truthy, i.e. the product already exists in the cart, then just increment the quantity
    if(itemInCart){
        //map through each item in the cartItems array, and return new array of same length. If there is an item in the cart that has a matching id of the product we are adding, then create a new object of that cart item and shadow copy/spread that old cart item's properties, and finally increment the quantity of that product by 1
        //Otherwise, if any element in current state of cartItems array does not have matching ID's, then just return those items as unchanged
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
    };
        // Otherwise, if itemInCart is not truthy, this means that the product being added is not in the cart. Creates a new array using the spread syntax ([...cartItems]) to shallow copy the original or previous cartItems array, and adds a new object representing productToAdd to the end of the array using the spread syntax ({...productToAdd}) with an additional property quantity set to 1, effectively initializing the quantity of the product being added to 1.
    return [...cartItems, {...productToAdd, quantity: 1}];
    //return statement is outside if block. Code also works if it is in an if/else block => key difference is that the return statement inside the if/else block will only execute when the condition is true, and return statement outside of the if block will always execute, regardless of the condition.
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find cart item to remove
    const itemInCart = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    //check if quanity equal to 1. If it is, then completely remove that item from the cart. Use filter method
    if(itemInCart.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
        //filter returns new array where the cartItem ID does not match the the ID of the cart item being removed, or in other words will return a new array of all the other cart items we still wish to keep (again, excluding the cart item of the ID we are wanting to remove)
    };
    // Otherwise, return back cart items with matching cart item with reduced quantity => map through cartItems, if id equals ID of product to be removed, then return new object with the cartItem's previous properties spreaded out and decrement quantity by 1. Else, just return original cart item
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
};


const deleteCartItem = (cartItems, cartItemToDelete) => {
    const itemInCart = cartItems.find(cartItem => cartItem.id === cartItemToDelete.id);
    
    if(itemInCart){
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToDelete.id);
    };
};

export const CartContext = createContext({
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    isCartOpen: false,
    setIsCartOpen: () => {},
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    deleteItemFromCart: () => {},

});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

// Note that only the 4 readable values defined in this initial state object is what will be stored and altered in the state object henceforth
const INITIAL_STATE = {
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    isCartOpen: false
};

const cartReducer = (state, action) => {
    console.log(state);
    const {type, payload} = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }

        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`)
    };
};

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    console.log(state);
    const {isCartOpen, cartItems, cartCount, cartTotal} = state;

    //whenever the items in the cart are updated, then generate new total, new item counts, and new array of items and call the dispatch function to update the state object with these new values
    const updateCartReducer = (newCartItems) => {
        // generate newCartTotal
        const newTotal = newCartItems.reduce((accumulator, cartItem) => accumulator + (cartItem.quantity * cartItem.price), 0);

        // generate newCartCount
        const newCartCount = newCartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0);
        
        //whenever item is added, subtracted, or removed, then the things that need to change are the totals, the amount of items in the cart, and the array of cart items. Target these 3 readable values in tis particular dispatch function
        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS,
            payload: {
                cartItems: newCartItems,
                cartTotal: newTotal,
                cartCount: newCartCount
            }
        });
    };

    //separate dispatch for isCartOpen 
    const setIsCartOpen = (boolean) => {
        dispatch({
            type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
            payload: boolean
        });
    };

    const addItemToCart = (productToAdd) => { // function accepts a product to add as an input. Remember, productToAdd is just a placeholder name. We will be using this CartContext and this addItemToCart function inside the ProductCard component, and inside ProductCard, we will be passing in the entire product object with name/image/price/id as the productToAdd => data fetched asynchronously from firestore and is returned as a hash map
        const newCartItems = (addCartItem(cartItems, productToAdd));
        updateCartReducer(newCartItems);
    };

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = (removeCartItem(cartItems, cartItemToRemove));
        updateCartReducer(newCartItems);
    };

    const deleteItemFromCart = (cartItemToDelete) => {
        const newCartItems = (deleteCartItem(cartItems, cartItemToDelete));
        updateCartReducer(newCartItems);
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, deleteItemFromCart, cartItems, cartCount, cartTotal};
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

// OLD WAY USING USESTATE
// export const CartProvider = ({children}) => {
//     const [cartCount, setCartCount] = useState(0);
//     const [isCartOpen, setIsCartOpen] = useState(false);
//     const [cartItems, setCartItems] = useState([]);
//     const [total, setTotal] = useState(0);

//     const addItemToCart = (productToAdd) => {
//         setCartItems(addCartItem(cartItems, productToAdd));
//     };

//     const removeItemFromCart = (productToRemove) => {
//         setCartItems(removeCartItem(cartItems, productToRemove));
//     };

//     const deleteItemFromCart = (productToDelete) => {
//         setCartItems(deleteCartItem(cartItems, productToDelete));
//     }

//     useEffect(() => {
//         const newCartCount = cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0); //accumulator starts at 0 => 0 + nextValue (cartItem)'s quantity. Will traverse through each cart item in the cartItems array and total the quantity of each cart item. Useffect will trigger this function everytime state of cartItems array changes

//         setCartCount(newCartCount);
//     }, [cartItems]);

//     useEffect(() => {
//         const newTotal = cartItems.reduce((accumulator, cartItem) => accumulator + (cartItem.quantity * cartItem.price), 0);

//         setTotal(newTotal);
//     }, [cartItems]);

//     const value = {cartCount, setCartCount, isCartOpen, setIsCartOpen, cartItems, setCartItems, addItemToCart, removeItemFromCart, deleteItemFromCart, total};
    
//     return (<CartContext.Provider value={value}>{children}</CartContext.Provider>)
// };




