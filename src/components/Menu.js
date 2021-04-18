import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-materialize';
import { projectFirestore } from "../firebase";
import Button from 'react-bootstrap/Button';

export default () => {

    const [products, setProducts] = useState([])
    const ref = projectFirestore.collection('products');

    function getProducts() {
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setProducts(items);
        });
    }

    useEffect(() => {
        getProducts();
    }, [])

    // console.log(products);

    // testing array that will contain products before we stablish online conectivity
    // const [products] = useState([
    //     {
    //         name: "Cookies",
    //         price: "$3.00",
    //         image: "test_images/cookie.jpg",
    //         description: "Cookies.  Need I say more?"
    //     },
    //     {
    //         name: "Sandwich",
    //         price: "$10.00",
    //         image: "test_images/Sandwich.jpg",
    //         description: "Artisan sandwiches"
    //     },
    //     {
    //         name: "Coffee",
    //         price: "$4.00",
    //         image: "test_images/Coffee.jpg",
    //         description: "Coffee, available in 'for here' and 'to go' cups"
    //     },
    //     {
    //         name: "Scones",
    //         price: "$5.50",
    //         image: "test_images/Scone.jpg",
    //         description: "Housemade scones"
    //     },
    // ]);

    return (
        <Container>
            <Row>
                <Col className="categories" s={12} m={3}>Holder text</Col>
                <Col s={12} m={9}>
                    <div className="products">
                        {products.map((product, idx) => (
                            <div className="holder" key={idx}>
                                <div className="product" >
                                    <div class="image">
                                        <img src={product.image} alt={product.name} class="img img-responsive full-width"></img>
                                    </div>
                                    {/*
                                    The following will be used when the back end is set
                                    <img src ={product.image} alt={product.name}></img>
                                    <p> {product.description} </p> -> add a feature to display this
                                    Note: add feature to customize your coffee
                                    */}
                                    <p> {product.name} </p>
                                    <span>
                                        <button className="button" height="20px">Add to cart (${product.price})</button>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

