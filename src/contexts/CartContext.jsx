import {createContext, useState, useEffect} from 'react';

// product {id, name, price, imageUrl}
// Cart item has same structure as product but has an additional quantity field => {id, name, price, imageUrl, quantity}

const addCartItem = (cartItems, productToAdd) => { //helper function accepts 2 arguments. First is the cartItems array of objects. Second is product to add, which ends up being the product object with id, name, price, and imageUrl being passed
    // find if cartItems contains productToAdd using the ID's. The find method returns boolean
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    //if the product already exists in the cart, then just increment the quantity
    if(existingCartItem){
        //map through each item in the cartItems array. If there is an item in the cart that has a matching id of the product we are adding, then return a new array containing within it a brand new object of that cart item and spread that old cart item's properties. Then, increment the quantity of that product by 1
        //Otherwise, if ID's do not match (cartItem is not related to productToAdd), then just return back the original cart item
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
    };

    // case if new product is added => return new array with modified cartItems / new cart item
    // create new array, and then spread out existing cartItems objects we have. Then, add to this the product object w/ quantity initalized to 1
    return [...cartItems, {...productToAdd, quantity: 1}];
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    //useEffect block is for updating the cart count. Needs to run everytime state of cartItems changes, so pass in cartItems as the 2nd parameter
    useEffect(() => {
        const newCartCount = cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0); //accumulator starts at 0. Function traverses through array and tallies new total according to quantity of cart items
        setCartCount(newCartCount);

    }, [cartItems]);

    const addItemToCart = (productToAdd) => { // function accepts a product to add as an input. Remember, productToAdd is just a placeholder name. We will be using this CartContext and this addItemToCart function inside the ProductCard component, and inside ProductCard, we will be passing in the entire product object with name/image/price/id as the productToAdd (remember that the entire product is passed as props in the Shop component, which is passed to the ProductCard)
        setCartItems(addCartItem(cartItems, productToAdd)); //set state of cartItems array by using addCartItem helper function above and passing in cartItems array and product object as arguments
        // setCartCount(cartCount + 1);
    };

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount}
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

