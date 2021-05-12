import { ButtonBase, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import CartContext from "./CartContext";
import CartProductCard from "./CartProductCard";
import emptyCart from "../emptyCartImg/emptycart.png";

const useStyles = makeStyles((theme) => ({
    clearCartBtn: {
        margin: 'auto',
        // marginTop: '10%',
        // marginLeft: '50%',
        padding: theme.spacing(2.5),
        color: 'white',
        backgroundColor: '#007bff',
        borderRadius: '15px',
    },
    image: {
        margin: 'auto',
        width: '50%'
    },
    img: {
        width: '100%'
    },
}));

const CartGrid = () => {
    const { cart, clearCart, getCartTotal, getCartAmount } = useContext(CartContext);
    const classes = useStyles();

    return (
        <>
            {cart && cart.map((product, i) => (
                <Row key={i}>
                    <Col >
                        <CartProductCard
                            product={product}
                        />
                    </Col>
                </Row>
            ))}
            {cart.length > 0 && (
                <Grid container spacing={9}>
                    <Grid item>
                        <Typography variant="h6" gutterBottom className={classes.cartTotal}>
                            Total Items: {getCartAmount()}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} container >
                        <Typography variant="h6" gutterBottom className={classes.cartTotal}>
                            Sub Total: ${getCartTotal()}
                        </Typography>
                        <Typography variant="h6" gutterBottom className={classes.cartTotal}>
                            {
                                //There is a function to make sure that the amount is shows correctly for money
                                // Create a function to show tax amount - make sure to make it so that it updates
                            }
                            Tax Amount: $(Testing)
                        </Typography>
                        <Typography variant="h6" gutterBottom className={classes.cartTotal}>
                            {
                                /*
                                    Add the sub total and tax amount to show the cart Total
                                */
                            }
                            Cart Total: $(Testing)
                        </Typography>
                    </Grid>
                    <Grid item xs={6} container justify="flex-end">
                        <ButtonBase className={classes.clearCartBtn} onClick={clearCart}>
                            Clear Cart
                        </ButtonBase>
                    </Grid>
                </Grid>
            )}
            {cart.length === 0 && (
                <Grid container spacing={1}>
                    <Grid item className={classes.image}>
                        <img className={classes.img} src={emptyCart} alt="Empty Cart Image" />
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default CartGrid;

