import {useDispatch, useSelector} from 'react-redux';

import { selectCartItems } from '../../store/cart/cart-selector';
import { addItemToCart, deleteItemFromCart, removeItemFromCart } from '../../store/cart/cart-actions';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {CartItemContainer, ItemDetails, CartItemName, CartItemPrice, IconContainer, Subtract, Add, Remove} from './cartItem.styles.jsx';

const CartItem = ({cartItem}) => {
    const {name, quantity, imageUrl, price} = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const permanentlyRemoveFromCart = () => dispatch(deleteItemFromCart(cartItems, cartItem));
    const addOneToCart = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeOneFromCart = () => dispatch(removeItemFromCart(cartItems, cartItem));

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
