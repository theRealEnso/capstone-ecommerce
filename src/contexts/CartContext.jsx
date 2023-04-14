import {createContext, useState, useEffect} from 'react';

// product {id, name, price, imageUrl}
// Cart item has same structure as product but has an additional quantity field => {id, name, price, imageUrl, quantity}

const addCartItem = (cartItems, productToAdd) => { //helper function accepts 2 arguments. First is the current state of cartItems array of objects. Second is product to add, which ends up being the product object with id, name, price, and imageUrl being passed in
    // find if cartItems contains an element that matches productToAdd's ID. The find method runs once for each element in the array until it returns a truthy value, then returns that element and stops iterating through the array
    const itemInCart = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    //if truthy, i.e. the product already exists in the cart, then just increment the quantity
    if(itemInCart){
        //map through each item in the cartItems array, and return new array of same length. If there is an item in the cart that has a matching id of the product we are adding, then create a new object of that cart item and shadow copy/spread that old cart item's properties, and finally increment the quantity of that product by 1
        //Otherwise, if any element in current state of cartItems array does not have matching ID's, then just return thos items as unchanged
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
    };
        // Otherwise, if itemInCart is not truthy, this means that the product being added is not in the cart. Creates a new array using the spread syntax ([...cartItems]) to shallow copy the original or previous cartItems array, and adds a new object representing productToAdd to the end of the array using the spread syntax ({...productToAdd}) with an additional property quantity set to 1, effectively initializing the quantity of the product being added to 1.
    return [...cartItems, {...productToAdd, quantity: 1}];
    //return statement is outside if block. Code also works if it is in an if/else block => key difference is that the return statement inside the if/else block will only execute when the condition is true, and return statement outside of the if block will always execute, regardless of the condition.
};

const removeItemFromCart = (cartItems, cartItemToRemove) => {
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
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    completelyDeleteItemFromCart: () => {},
    cartCount: 0,
    total: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [total, setTotal] = useState(0);

    //this useEffect block is for updating the cart count. Needs to run everytime state of cartItems changes, so pass in cartItems as the 2nd parameter
    useEffect(() => {
        const newCartCount = cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0); //accumulator starts at 0. Function traverses through array and tallies new total according to quantity of cart items. Runs everytime state of cartItems changes
        setCartCount(newCartCount);

    }, [cartItems]);

    useEffect(() => {
        const newTotal = cartItems.reduce((accumulator, cartItem) => accumulator + (cartItem.quantity * cartItem.price), 0); //accumulator starts at 0. Function traverses through array and tallies new total according to quantity of cart items. Runs everytime state of cartItems changes
        setTotal(newTotal);

    }, [cartItems]);

    const addItemToCart = (productToAdd) => { // function accepts a product to add as an input. Remember, productToAdd is just a placeholder name. We will be using this CartContext and this addItemToCart function inside the ProductCard component, and inside ProductCard, we will be passing in the entire product object with name/image/price/id as the productToAdd => data fetched asynchronously from firestore and is returned as a hash map
        setCartItems(addCartItem(cartItems, productToAdd)); //set state of cartItems array by using addCartItem helper function above and passing in cartItems array and product object as arguments
        // setCartCount(cartCount + 1);
    };

    const deleteItemFromCart = (cartItemToRemove) => {
        setCartItems(removeItemFromCart(cartItems, cartItemToRemove));
    };

    const completelyDeleteItemFromCart = (cartItemToDelete) => {
        setCartItems(deleteCartItem(cartItems, cartItemToDelete));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, deleteItemFromCart, completelyDeleteItemFromCart, cartItems, cartCount, total}
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

