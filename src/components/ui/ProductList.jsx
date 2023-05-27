import ProductCard from "./ProductCard";
const ProductList = ({ data, loading }) => {
  return (
    <>
      {!loading ? (
        data.map((item, index) => <ProductCard item={item} key={index} />)
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
