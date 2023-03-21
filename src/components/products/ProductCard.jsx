import {useContext} from 'react';
import { CartContext } from '../../contexts/CartContext';
import './productCard.styles.scss';
import Button from '../button/Button';

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    const {addItemToCart} = useContext(CartContext); //link cart context to product card, extract addItemToCart function;

    const addProductToCart = () => addItemToCart(product);
    
    return (
        <div className='products-card-container'>
            <img src={imageUrl} alt={`${name}`}></img>
            <div className='footer'>
                <span className='product-name'>{name}</span>
                <span className='product-price'>{price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart}>Add to Cart</Button>
        </div>
    );
};

export default ProductCard;

// const addItemToCart = (productToAdd) => { // function accepts a product to add as an input. Remember, productToAdd is just a placeholder name. We will be using this CartContext and this addItemToCart function inside the ProductCard component, and inside ProductCard, we will be passing in the entire product as the productToAdd (remember that the entire product is passed as props in the Shop component, which is passed to the ProductCard)
//     setCartItems(addCartItem(cartItems, productToAdd));
//     setCartCount(cartCount + 1);
// };

// setCartItems then updates state of cartItems, and updated cartItems state is reflected in the CartDropDown component => CartDropDown component then maps over the updated cartItems state and renders a CardItem for each item in the array