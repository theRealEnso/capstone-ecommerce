import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import './cartDropdown.styles.scss';
import Button from '../button/Button';
import CartItem from '../cart-item/CartItem';

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();
    const goToCheckoutPage = () => {
        navigate('/checkout');
    }
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => (<CartItem key={item.id} cartItem={item}/>))}
            </div>

            <Button onClick={goToCheckoutPage}>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;