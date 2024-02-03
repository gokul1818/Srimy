import React from "react";
import { Row, Col } from "reactstrap";
import ProductSearch from "./ProductSearch";
import ProductCard from "./ProductCard";
const ManufactureUnit = () => {
  const limitedData = [];
  const loading = false;
  const data = [
    {
      imgUrl:
        "https://www.polyfit.co.in/wp-content/uploads/2023/09/CNC-Machine-400x229-1.jpg",
      productName: "CNC MACHINE",
      category:
        "The CNC Machine shop consists of CNC Turning centers and VMC capable of producing highly accurate components.",
    },
    {
      imgUrl:
        "https://www.polyfit.co.in/wp-content/uploads/2015/10/CNC-Machining-400x229.jpg",
      productName: "Tubes & Pipe Bending",
      category:"Our Tube and pipe bending machines have capability to bend from 6mm to 120mm."
    },
    {
      imgUrl:"https://www.polyfit.co.in/wp-content/uploads/2015/10/Hose-assemblies-400x229.jpg",
      productName: "Hose Assemblies",
      category:"Hose Assemblies are manufactured using European Hose and Nut crimping machines."
    },

  ];

  return (
    <>
      {!loading ? (
        data.map((item, index) => <ProductCard item={item} key={index} />)
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

export default ManufactureUnit;
