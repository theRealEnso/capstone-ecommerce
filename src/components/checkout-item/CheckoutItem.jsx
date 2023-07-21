import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart-selector';
import { addItemToCart, removeItemFromCart, deleteItemFromCart } from '../../store/cart/cart-actions';

import {CheckoutItemContainer, ImageContainer, CheckoutItemName, CheckoutItemQuantity, Value, Price, ItemTotal, Arrow, RemoveButton } from './checkout-item.styles.jsx';

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const permanentlyRemoveFromCart = () => dispatch(deleteItemFromCart(cartItems, cartItem));
    const addOneToCart = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeOneFromCart = () => dispatch(removeItemFromCart(cartItems, cartItem));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`}></img>
            </ImageContainer>

            <CheckoutItemName>{name}</CheckoutItemName>

            <CheckoutItemQuantity>
                <Arrow onClick={removeOneFromCart}>
                    &#10094;
                </Arrow>

                <Value>{quantity}</Value>

                <Arrow onClick={addOneToCart}>
                    &#10095;
                </Arrow> 
            </CheckoutItemQuantity>

            <Price>$ {price}</Price>

            <ItemTotal>$ {price * quantity}</ItemTotal>

            <RemoveButton onClick={permanentlyRemoveFromCart}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;