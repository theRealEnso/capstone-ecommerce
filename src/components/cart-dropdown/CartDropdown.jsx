import {useSelector} from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart-selector.js';

import {useNavigate} from 'react-router-dom';
import {CartDropdownContainer, CartItems, EmptyMessage, Subtotal} from  './cartDropdown.styles.jsx';
import Button from '../button/Button';
import CartItem from '../cart-item/CartItem';

const CartDropdown = () => {
    // const {cartItems, cartTotal} = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    const navigate = useNavigate();
    
    const goToCheckoutPage = () => {
        navigate('/checkout');
    }
    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map((item) => (<CartItem key={item.id} cartItem={item}/>))) : <EmptyMessage>Your cart is empty</EmptyMessage>
                }

                <Subtotal>
                    <h3>Subtotal: $ {cartTotal}</h3>
                </Subtotal>
            </CartItems>

            <Button onClick={goToCheckoutPage}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;