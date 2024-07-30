import { useParams } from 'react-router-dom';
import ProductDetailComponent from '../../components/product/ProductDetailComponent';

const ProductDetailPage = () => {

  const {id} = useParams();

  console.log(id)

  return (
    <ProductDetailComponent num={id}/>
  );
}

export default ProductDetailPage;
