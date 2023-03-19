import './productCard.styles.scss';
import Button from '../button/Button';

const ProductCard = ({name, price, imageURL}) => {
    return (
        <div className='products-card-container'>
            <img src={imageURL} alt={`${name}`}></img>
            <div className='footer'>
                <span className='product-name'>{name}</span>
                <span className='product-price'>{price}</span>
            </div>
            <Button buttonType='inverted'>Add to Cart</Button>
        </div>
    );
};

export default ProductCard;