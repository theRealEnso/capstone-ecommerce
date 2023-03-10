import {Fragment} from 'react';
import {Outlet, Link} from 'react-router-dom';

import {ReactComponent as CrownLogo} from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
    return (
      // fragments a component that renders to nothing when mounted on the DOM. We use this because rules in React says we need a top level parent for components (like how we usually place everything under a div). This is useful if we don't actually want to render an HTML element, such as the parental or wrapping div we typically use
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrownLogo className='logo' />
            </Link>

          <div className="nav-links-container">
            <Link className="nav-link" to='/shop'>
                SHOP
            </Link>
          </div>

        </div>
        <Outlet></Outlet>
      </Fragment>
    );
  };

  export default Navigation;