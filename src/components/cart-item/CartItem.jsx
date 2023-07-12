import {useContext} from 'react';
import { CartContext } from '../../contexts/CartContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {CartItemContainer, ItemDetails, CartItemName, CartItemPrice, IconContainer, Subtract, Add, Remove} from './cartItem.styles.jsx';

const CartItem = ({cartItem}) => {
    const {name, quantity, imageUrl, price} = cartItem;
    const {deleteItemFromCart, addItemToCart, removeItemFromCart} = useContext(CartContext);

    const permanentlyRemoveFromCart = () => deleteItemFromCart(cartItem);
    const addOneToCart = () => addItemToCart(cartItem);
    const removeOneFromCart = () => removeItemFromCart(cartItem);

    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`}></img>

            <ItemDetails>
                <CartItemName>{name}</CartItemName>
                <CartItemPrice>{quantity} x ${price}</CartItemPrice>
                <IconContainer>
                    <Subtract onClick={removeOneFromCart}>
                        &#8722;
                    </Subtract>

                    <Add onClick={addOneToCart}>
                        &#43;
                    </Add>

                    <Remove onClick={permanentlyRemoveFromCart}>
                        <DeleteForeverIcon />
                    </Remove>
                </IconContainer>
            </ItemDetails>


        </CartItemContainer>
    );
};

export default CartItem;
