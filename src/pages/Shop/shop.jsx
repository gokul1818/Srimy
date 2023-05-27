import React, { useState, useEffect } from "react";
import Helmet from "../../components/helmet/helmet";
import CommonSection from "../../components/ui/Commonsection";
import { Container, Row, Col } from "reactstrap";
import "../../styles/shop.css";
import ProductList from "../../components/ui/ProductList";
import useGetData from "../../customhook/useGetData";
const Shop = () => {
  const { data: product, loading } = useGetData("products");

  useEffect(() => {
    const shopdata = product.map((item) => item);
    setProducts(shopdata);
  }, [product]);

  const [products, setProducts] = useState([]);

  const sortByFilter = (e) => {
    const filtervalue = e.target.value;
    if (filtervalue === "ascending") {
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      setProducts(sortedProducts);
    }
    if (filtervalue === "decending") {
      const sortedProducts = [...products].sort((a, b) => b.price - a.price);
      setProducts(sortedProducts);
    }
  };

  const handleFilter = (e) => {
    const filtervalue = e.target.value;
    // console.log(filtervalue)
    if (filtervalue === "all") {
      const filteredproduct = product.map((item) => item);
      setProducts(filteredproduct);
    }
    if (filtervalue === "sofa") {
      const filteredproduct = product.filter(
        (item) => item.category === "sofa"
      );
      setProducts(filteredproduct);
    }
    if (filtervalue === "mobile") {
      const filteredproduct = product.filter(
        (item) => item.category === "mobile"
      );
      setProducts(filteredproduct);
    }
    if (filtervalue === "watch") {
      const filteredproduct = product.filter(
        (item) => item.category === "watch"
      );
      setProducts(filteredproduct);
    }
    if (filtervalue === "wireless") {
      const filteredproduct = product.filter(
        (item) => item.category === "wireless"
      );
      setProducts(filteredproduct);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchteam = e.target.value;
    const searchProducts = product.filter((item) =>
      item.productName
        .toLocaleLowerCase()
        .includes(searchteam.toLocaleLowerCase())
    );
    setProducts(searchProducts);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Helmet title="shop ">
      <CommonSection title="product" />
      <section>
        <Container>
          <Row>
            <Col lg="2" md="3" xs="6">
              <div className="filter_widget">
                <select onChange={handleFilter}>
                  {/* <option>filter by category</option> */}
                  <option value="all">All</option>
                  <option value="sofa">sofa</option>
                  <option value="mobile">mobile</option>
                  <option value="watch">watches</option>
                  <option value="wireless">wireless</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="3" xs="6">
              <div className="filter_widget">
                <select onChange={sortByFilter}>
                  <option>Sort By</option>

                  <option value="decending">High to Low</option>
                  <option value="ascending">Low to High</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="6" xs="12">
              <div className="search_box text-center mx-auto">
                <input
                  type="text"
                  placeholder="search..."
                  onChange={handleSearch}
                ></input>
                <span>
                  <i class="ri-search-2-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            {products.length === 0  && !loading ? (
              <h1 className="text-center fs-4">No products found</h1>
            ) : (
              // <ProductList data={productdata} />
        <ProductList data={products}  loading={loading}/>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
export default Shop;
