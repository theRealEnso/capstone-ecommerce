import {Fragment, useContext} from 'react';
import {Outlet} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { signOutUser } from '../../utilities/firebase/firebaseUtilities';

import {ReactComponent as CrownLogo} from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/CartIcon';
import CartDropdown from '../../components/cart-dropdown/CartDropdown';

import  {NavigationContainer, NavLinksContainer, NavLink, LogoContainer} from './navigation.styles.jsx';

const Navigation = () => {
  const {currentUser} = useContext(UserContext);
  // console.log(currentUser);
  const {isCartOpen} = useContext(CartContext);
  
  
  return (
    // fragments a component that renders to nothing when mounted on the DOM. We use this because rules in React says we need a top level parent for components (like how we usually place everything under a div). This is useful if we don't actually want to render an HTML element, such as the parental or wrapping div we typically use
    <Fragment>
      <NavigationContainer>
          <LogoContainer to='/'>
              <CrownLogo className='logo' />
          </LogoContainer>

        <NavLinksContainer>
        
          <NavLink to='/shop'>
              SHOP
          </NavLink>

          {
            currentUser ? (
              <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
            ) : (
              <NavLink to='/sign-in'>
                SIGN IN
              </NavLink>
              )
          }

          <CartIcon />

        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet></Outlet>
  
    </Fragment>
  );
};

  export default Navigation; 