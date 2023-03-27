import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';

import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const {completelyDeleteItemFromCart, addItemToCart, deleteItemFromCart} = useContext(CartContext);

    const permanentlyRemoveFromCart = () => completelyDeleteItemFromCart(cartItem);
    const addOneToCart = () => addItemToCart(cartItem);
    const removeOneFromCart = () => deleteItemFromCart(cartItem);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}></img>
            </div>

            <span className='name'>{name}</span>

            <span className='quantity'>
                <div className='arrow' onClick={removeOneFromCart}>
                    &#10094;
                </div>

                <span className='value'>{quantity}</span>

                <div className='arrow' onClick={addOneToCart}>
                    &#10095;
                </div> 
            </span>

            <span className='price'>$ {price * quantity}</span>

            <div className='remove-button' onClick={permanentlyRemoveFromCart}>&#10005;</div>
        </div>
    );
};

export default CheckoutItem;