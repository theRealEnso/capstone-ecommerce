import {Routes, Route} from 'react-router-dom';
import Navigation from './routes/navigation/NavigationComponent';
import Home from "./routes/home/HomeComponent";
import SignIn from './routes/sign-in/SignInComponent';

const Shop = () => {
  return (
    <div>
      <h1>I am the shop page!</h1>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
    {/* path specifies the route, and then we pass in the component we want to render for the specified route in the element attribute */}
    {/* Want navigation bar to persist at all times => specify path to '/' and then nest the rest of our other routes under Navigation path. Next, we use the Outlet module from react-router-dom inside the Navigation component, which tells our application to match the '/' path of the navigation as the base component. Whatever is inside the base component (all the nested routes and corresponding React components) where the Outlet tag is used) will be rendered*/}

    {/* With this new structure, our Navigation is essentially a parent component relative to the rest of the other components */}
      <Route path='/' element={<Navigation />}>
        <Route index={true} element={<Home />}></Route>
        <Route path='/shop' element={<Shop />}></Route>
        <Route path='/sign-in' element={<SignIn />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
