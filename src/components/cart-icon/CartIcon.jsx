import {useContext, useEffect, useRef} from 'react';
import {ReactComponent as ShoppingCartIcon} from '../../assets/shopping-bag.svg';

import { CartContext } from '../../contexts/CartContext';
import './cartIcon.styles.scss';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    const btnRef = useRef();


    // useEffect block is to implement functionality to also hide the shopping cart when user clicks outside of the cart
    useEffect(() => {
        const closeCartDropDown = (event) => {
            // console.log(event);
            if(event.target.className !== 'cart-icon-container' && event.target.className !== 'item-count' && event.srcElement.id !== 'Capa_1') {
                setIsCartOpen(false);
            };
        };
            
        document.body.addEventListener('click', closeCartDropDown);

        return () => document.body.removeEventListener('click', closeCartDropDown); // remove event listener when component unmounts
    }, [setIsCartOpen]);

    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen} ref={btnRef}>
            <ShoppingCartIcon className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </div>
    );
};

export default CartIcon;