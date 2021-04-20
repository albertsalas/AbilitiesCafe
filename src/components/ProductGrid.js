import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import useFirestore from "../hooks/useFirestore";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router";

const ProductGrid = () => {
  const { docs } = useFirestore("products");
  const location = useLocation();
  // TODO: align the grid
  return (
      <Row className="justify-content-md-center">
        {docs &&
          docs.map((doc, i) => (
            <Col md="auto" key={i} className="m-1">
              <ProductCard
                product={doc}
                isAdmin={location.pathname === "/admin"}
              />
            </Col>
          ))}
      </Row>
  );
};

export default ProductGrid;
