import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { setIsCartOpen } from '../../store/cart/cart-actions';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart-selector';
import {ReactComponent as ShoppingCartIcon} from '../../assets/shopping-bag.svg';

import {CartIconContainer, ItemCount} from './cartIcon.styles.jsx';

const CartIcon = () => {
    // const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
    const dispatch = useDispatch();

    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);
    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    
    // useEffect block is to implement functionality to that hides the shopping cart when user clicks outside of the cart. Want cart open when item is added to cart and to stay open on screen when icon is clicked, number of items clicked, actual cart item menu itself is clicked
    useEffect(() => {
        const closeCartDropDown = (event) => {
            console.log(event);
            if(event.target.id !== 'Capa_1' && event.target.className !== 'sc-gueYoa inPKWa' && event.target.innerHTML !== 'Add to Cart' && event.target.innerHTML !== "−" && event.target.innerHTML !== '+') {
                dispatch(setIsCartOpen(false));
            };
        };
        
        const cartDropdownEventListener = document.body.addEventListener('click', closeCartDropDown);

        return cartDropdownEventListener;
    }, [dispatch]);

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingCartIcon/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;