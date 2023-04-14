import {Routes, Route} from 'react-router-dom';
import Navigation from './routes/navigation/Navigation';
import Home from "./routes/home/Home";
import Authentication from './routes/authentication/Authentication';
import Shop from './routes/shop/Shop';
import Checkout from './components/checkout/Checkout';

const App = () => {
  return (
    <Routes>
    {/* path specifies the route, and then we pass in the component we want to render for the specified route in the element attribute */}
    {/* Want navigation bar to persist at all times => specify path to '/' and then nest the rest of our other routes under Navigation path. Next, we use the Outlet module from react-router-dom inside the Navigation component, which tells our application to match the '/' path of the navigation as the base component. Whatever is inside the base component (all the nested routes and corresponding React components) where the Outlet tag is used) will be rendered*/}

    {/* With this new structure, our Navigation is essentially a parent component relative to the rest of the other components */}
      <Route path='/' element={<Navigation />}>
        <Route index={true} element={<Home />}></Route>

        {/* shop route has a /* => the * tells code that when we go to /shop route, we know that there will be a parameter set after shop, because shop will have its own routes inside i.e. /shop/hats, /shop/sneakers, etc etc and to always render the shop component */}
        <Route path='shop/*' element={<Shop />}></Route> 
        <Route path='sign-in' element={<Authentication />}></Route>
        <Route path='checkout' element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
