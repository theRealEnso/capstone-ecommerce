import {useContext} from 'react';
import { CartContext } from '../../contexts/CartContext';
import  {ProductsCardContainer, Footer, ProductName, ProductPrice} from './productCard.styles.jsx';
import Button, {BUTTON_TYPE_CLASSES} from '../button/Button';

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    const {addItemToCart, setIsCartOpen} = useContext(CartContext); //link cart context to product card, extract addItemToCart function;

    const addProductToCart = () => {
        addItemToCart(product);
        setIsCartOpen(true);
    };
    
    return (
        <ProductsCardContainer>
            <img src={imageUrl} alt={`${name}`}></img>
            <Footer>
                <ProductName>{name}</ProductName>
                <ProductPrice>$ {price}</ProductPrice>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to Cart</Button>
        </ProductsCardContainer>
    );
};

export default ProductCard;

// const addItemToCart = (productToAdd) => { 
//     setCartItems(addCartItem(cartItems, productToAdd));
//     setCartCount(cartCount + 1);

// function accepts a product to add as an input. Remember, productToAdd is just a placeholder name. We will be using the CartContext and its addItemToCart function inside this ProductCard component. Inside ProductCard, we will be passing in the entire product as the productToAdd (remember that the entire product(s) for now is received from hardcoded products data in ProductsContext, which is then passed as props in the Shop component, which is then passed to the ProductCard)
// };

// setCartItems then updates state of cartItems, and updated cartItems state is reflected in the CartDropDown component => CartDropDown component then maps over the updated cartItems state and renders a CardItem for each item in the array. It's all connected to each other