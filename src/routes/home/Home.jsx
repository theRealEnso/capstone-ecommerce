import {Outlet} from 'react-router-dom';

import DirectoryList from '../../components/directory-list/DirectoryList';

const Home = () => {
    
    return (
      <div>
        <DirectoryList />
        <Outlet />
      </div>
    );
  };

  export default Home;