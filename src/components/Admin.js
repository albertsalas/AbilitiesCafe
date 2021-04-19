import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import AuthContext from "../contexts/AuthContext";
import { Col, Container, Row, Button } from "react-bootstrap";
import AddProductForm from "./AddProductForm";
import ProductGrid from "./ProductGrid";

const Admin = () => {
  const { currentUser } = useContext(AuthContext);
  const [modalShow, setModalShow] = useState(false);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  return (
    <Container fluid className="justify-content-center">
      <AddProductForm show={modalShow} onHide={() => setModalShow(false)} />
      <Row className="justify-content-md-center">
        <Button variant="primary" size="lg" className="m-5" onClick={() => setModalShow(true)}>
          Add a new product
        </Button>
      </Row>
      <ProductGrid />
    </Container>
  );
};

export default Admin;
