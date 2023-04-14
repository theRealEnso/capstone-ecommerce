import {Link} from 'react-router-dom';
import {CategoryPreviewContainer, Preview, ViewMore} from './category-preview.styles.jsx';
import ProductCard from '../products/ProductCard';

//want this component to only display first 4 products in each category as a preview
const CategoryPreview = ({title, products}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Link className='title' to={title}>{title.toUpperCase()}</Link>
                
            </h2>

            <Preview>
                {
                    products.filter((_, index) => index < 4) // pass in underscore as first argument, which tells code to ignore it. We just care about the index => return to me a new array of products that have index less than 4 (index of 0, 1, 2, 3)
                    .map((product) => <ProductCard key={product.id} product={product} /> ) // then map through each array item and render ProductCard component
                }
            </Preview>
            
            <div>
                <h3>
                    <ViewMore><Link className='sub-title' to={title}>View More {title.charAt(0).toUpperCase() + title.slice(1)}</Link></ViewMore>
                </h3>
            </div>



        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;