import {BackgroundImage, BodyContainer, DirectoryItemContainer} from './directory-item.styles.jsx'
import {useNavigate} from 'react-router-dom';

const DirectoryItem = ({category}) => {
  const {imageUrl, title, route} = category;

  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
      <DirectoryItemContainer onClick={onNavigateHandler}>
        <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
        <BodyContainer>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </BodyContainer>
      </DirectoryItemContainer>
  );
};

export default DirectoryItem;