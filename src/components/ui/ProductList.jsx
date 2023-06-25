import React from "react";
import { Row, Col } from "reactstrap";
import ProductSearch from "./ProductSearch";
import ProductCard from "./ProductCard";
const ProductList = ({ data, loading, searchList, productLimit }) => {
  const limitedData = data.slice(0, productLimit);

  return (
    <>
      {!loading && !searchList ? (
        data.map((item, index) => <ProductCard item={item} key={index} />)
      ) : !loading && searchList ? (
        limitedData.map((item, index) => (
          <div className="Product_list_search">
            <ProductSearch item={item} key={index} />
          </div>
        ))
      ) : (
        <Row className="w-100">
          <Col lg="12">
            <div className="loading-card">
              <div className="shine"></div>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductList;
