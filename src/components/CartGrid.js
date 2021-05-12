import { ButtonBase, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import CartContext from "./CartContext";
import CartProductCard from "./CartProductCard";
import emptyCart from "../emptyCartImg/emptycart.png";

const useStyles = makeStyles((theme) => ({
    clearCartBtn: {
        margin: 'auto',
        marginTop: '10%',
        // marginLeft: '50%',
        padding: theme.spacing(2.5),
        color: 'white',
        backgroundColor: '#007bff',
        borderRadius: '15px'
    },
    image: {
        margin: 'auto',
        width: '50%'
    },
    img: {
        width: '100%'
    }
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
                        <ButtonBase className={classes.clearCartBtn} onClick={clearCart}>
                            Clear Cart
                        </ButtonBase>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" gutterBottom className={classes.cartTotal}>
                            Total Items: {getCartAmount()}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" gutterBottom className={classes.cartTotal}>
                            Sub Total: ${getCartTotal()}
                        </Typography>
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

