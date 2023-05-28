import ProductCard from "./ProductCard";
import useGetData from "../../customhook/useGetData";



const ProductList = ( ) => {
  const { data: productData, loading } = useGetData(`products`);

  return (
    <>
      {!loading ? (
        productData.map((item, index) => <ProductCard item={item} key={index} />)
      ) : (
        <div className="loading-card">
          <div className="shine"></div>
          <div className="content">
            <div className="title shine"></div>
            <div className="description shine"></div>
          </div>
        </div>
      )}
      {/* {data.map((item, index) => (
        <ProductCard item={item} key={index} />
      ))} */}
    </>
  );
};
export default ProductList;
