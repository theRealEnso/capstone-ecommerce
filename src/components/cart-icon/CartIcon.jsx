import {useContext, useEffect} from 'react';
import {ReactComponent as ShoppingCartIcon} from '../../assets/shopping-bag.svg';

import { CartContext } from '../../contexts/CartContext';
import {CartIconContainer, ItemCount} from './cartIcon.styles.jsx';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    
    // useEffect block is to implement functionality to that hides the shopping cart when user clicks outside of the cart. Want cart open when item is added to cart and to stay open on screen when icon is clicked, number of items clicked, actual cart item menu itself is clicked
    useEffect(() => {
        const closeCartDropDown = (event) => {
            // console.log(event);
            if(event.target.id !== 'Capa_1' && event.target.className !== 'sc-gueYoa inPKWa' && event.target.innerHTML !== 'Add to Cart' && event.target.innerHTML !== "−" && event.target.innerHTML !== '+' && event.target.parentNode.lastElementChild.lastChild.tagName !== 'path') {
                setIsCartOpen(false);
            };
        };
            
        document.body.addEventListener('click', closeCartDropDown);

        return () => document.body.removeEventListener('click', closeCartDropDown); // remove event listener when component unmounts
    }, [setIsCartOpen]);

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingCartIcon/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;