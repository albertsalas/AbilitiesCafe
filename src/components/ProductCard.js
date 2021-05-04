import React, { useContext, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { projectFirestore, projectStorage } from "../firebase";
import EditProductForm from "./EditProductForm";
import CartContext from "./CartContext";

const ProductCard = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [productModalShow, setProductModalShow] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});
  const { addToCart } = useContext(CartContext);

  const handleModalClose = () => {
    setModalShow(false);
  };

  const handleModalShow = (name) => {
    setModalShow(true);
  };
  const handleOnEdit = (product) => {
    setProductToEdit(product);
    setProductModalShow(true);
  };

  const handleOnDelete = (name) => {
    projectFirestore
      .collection("products")
      .where("name", "==", name)
      .get()
      .then((snapshot) => {
        let imageToDelete = snapshot.docs[0].data().image;
        let ref = projectStorage.refFromURL(imageToDelete);
        ref.delete();
        snapshot.docs[0].ref.delete();
        handleModalClose();
      });
  };

  return (
    <>
      <EditProductForm
        product={productToEdit}
        show={productModalShow}
        onHide={() => setProductModalShow(false)}
      />
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>Product Deletion</Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this item? This action cannot be
          undone
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleOnDelete(props.product.name);
            }}
          >
            Yes, I understand
          </Button>
        </Modal.Footer>
      </Modal>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.product.image} />
        <Card.Body>
          <Card.Title>{props.product.name}</Card.Title>
          <Card.Text>{props.product.description}</Card.Text>
          {props.isAdmin && (
            <>
              <Button
                className="m-2"
                variant="primary"
                onClick={() => {
                  handleOnEdit(props.product);
                }}
              >
                Edit
              </Button>
              <Button
                className="m-2"
                variant="danger"
                onClick={(handleModalShow)}
              >
                Delete
              </Button>
            </>
          )}
          {!props.isAdmin && <Button variant="primary" onClick={() => addToCart(props.product)}>Add to Cart</Button>}
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
