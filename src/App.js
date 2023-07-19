import {Routes, Route} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { createUserDocumentFromAuth, onAuthStateChangedListener} from './utilities/firebase/firebaseUtilities';
import Navigation from './routes/navigation/Navigation';
import Home from "./routes/home/Home";
import Authentication from './routes/authentication/Authentication';
import Shop from './routes/shop/Shop';
import Checkout from './components/checkout/Checkout';

import {setCurrentUser} from './store/user/user-action.js'

const App = () => {
  const dispatch = useDispatch();

  //moving over to redux. No longer using a UserProvider / User Context. Need to get user another way. Paste previous useEffect code from previous user context file here. Bring in useDispatch hook from redux because we still need to dispatch the action
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
        console.log(user);
        if(user) {
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));

        // dispatch({
        //   type: USER_ACTION_TYPES.SET_CURRENT_USER,
        //   payload: user
        // })
    });

    return unsubscribe;
}, [dispatch]); // throws linter error if dependency array is empty. Technically speaking, we aren't updating anything and are only ever dispatching one action on mount, and that is it.

  return (
    <Routes>
    {/* path specifies the route, and then we pass in the component we want to render for the specified route in the element attribute */}
    {/* Want navigation bar to persist at all times => specify path to '/' and then nest the rest of our other routes under Navigation path. Next, we use the Outlet module from react-router-dom inside the Navigation component, which tells our application to match the '/' path of the navigation as the base component. Whatever is inside the base component (all the nested routes and corresponding React components) where the Outlet tag is used) will be rendered*/}

    {/* With this new structure, our Navigation is essentially a parent component relative to the rest of the other components */}
      <Route path='/' element={<Navigation />}>
        <Route index={true} element={<Home />}></Route>

        {/* shop route has a /* => the * tells code that when we go to /shop route, then just render the shop component first. We know there will be additional routes that the shop component will handle from there */}
        <Route path='shop/*' element={<Shop />}></Route> 
        <Route path='sign-in' element={<Authentication />}></Route>
        <Route path='checkout' element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
