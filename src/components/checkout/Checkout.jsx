import {useContext} from 'react';
import { CartContext } from '../../contexts/CartContext';
import CheckoutItem from '../checkout-item/CheckoutItem';

import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles.jsx';

const Checkout = () => {
    const {cartItems, total} = useContext(CartContext);
    
    return (
        <CheckoutContainer>

            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Price/item</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Item Total</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
                {
                    cartItems.map((cartItem) => (<CheckoutItem key={cartItem.id} cartItem={cartItem}/>))
                }
                <Total>Total: $ {total}</Total>
        </CheckoutContainer>
    );
};

export default Checkout;