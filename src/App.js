import {Routes, Route} from 'react-router-dom';
import Navigation from './routes/navigation/Navigation';
import Home from "./routes/home/HomeComponent";


const Shop = () => {
  return (
    <div>
      <h1>I am the shop page!</h1>
    </div>
  )
}

const App = () => {
  return (
    <Routes>
    {/* path specifies the route, and then we pass in the component we want to render for the specified route in the element attribute */}
    {/* Want navigation bar to persist at all times. Render navigation at the top level using Outlet (Outlet specifies where the rest of the components should render). Next, specify path to '/' on mount whilst rendering Home Component, and then nest desired routes inside */}
      <Route path='/' element={<Navigation />}>
        <Route index={true} element={<Home />}></Route>
        <Route path='shop' element={<Shop />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
