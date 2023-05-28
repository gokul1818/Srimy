import ProductCard from "./ProductCard";
import useGetData from "../../customhook/useGetData";
import { Row ,Col} from "reactstrap";

const ProductList = ({ data, loading }) => {
  // const { data: productData, loading } = useGetData(`products`);

  return (
    <>
      {!loading ? (
        data.map((item, index) => <ProductCard item={item} key={index} />)
      ) : (
        <Row>

         <Col lg='12'>
        <div className="loading-card">
          <div className="shine"></div>
        </div>
         </Col> 
        </Row>
      )}
      {/* {data.map((item, index) => (
        <ProductCard item={item} key={index} />
      ))} */}
    </>
  );
};
export default ProductList;
