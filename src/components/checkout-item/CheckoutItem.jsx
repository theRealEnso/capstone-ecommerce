import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';

import {CheckoutItemContainer, ImageContainer, CheckoutItemName, CheckoutItemQuantity, Value, Price, ItemTotal, Arrow, RemoveButton } from './checkout-item.styles.jsx';

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const {deleteItemFromCart, addItemToCart, removeItemFromCart} = useContext(CartContext);

    const permanentlyRemoveFromCart = () => deleteItemFromCart(cartItem);
    const addOneToCart = () => addItemToCart(cartItem);
    const removeOneFromCart = () => removeItemFromCart(cartItem);

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