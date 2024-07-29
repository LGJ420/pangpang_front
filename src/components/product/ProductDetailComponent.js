import { useEffect, useState } from "react"
import { getOne } from "../../api/productApi";

const initState = {
  pno: 0,
  productTitle: '',
  productContent: '',
  productPrice: 0
}

const ProductDetailComponent = ({pno}) => {

  const [product, setProduct] = useState(initState);

  useEffect(() => {
    getOne(pno).then(data => {
      console.log(data)
      setProduct(data)
    })
  }, [tno])

  return (
    <div></div>
  )
}

export default ProductDetailComponent;