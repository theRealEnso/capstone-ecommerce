import {Fragment, useContext} from 'react';
import {Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux'; // this hook allows us to get the values inside the redux store into our components
import { selectCurrentUser } from '../../store/user/user-selector';

// import {UserContext} from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { signOutUser } from '../../utilities/firebase/firebaseUtilities';

import {ReactComponent as CrownLogo} from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/CartIcon';
import CartDropdown from '../../components/cart-dropdown/CartDropdown';

import  {NavigationContainer, NavLinksContainer, NavLink, LogoContainer} from './navigation.styles.jsx';

const Navigation = () => {

  // const currentUser = useSelector((state) => state.user.currentUser); // use the useSelector hook. This is how we extract off the values that we need from the entire redux store. Hook needs a selector function

  //inside the selector function, we always receive the ENTIRE state object of the redux store => from the entire state object in the redux store, we nest deeper to get the user reducer (user key contains userReducer), and then even further deeper to get the actual currentUser object. Reminder that currentUser is the initial state value variable defined in the reducer file
  // useSelector((state) => {
  //   console.log(state);
  //   console.log(state.user);
  //   return state.user.currentUser;
  // });

  const currentUser = useSelector(selectCurrentUser); // refactor code above using separate helper function

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