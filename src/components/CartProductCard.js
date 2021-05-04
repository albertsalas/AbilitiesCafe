import React, { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CartContext from "./CartContext";
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        border: 'solid 5px lightgray',
        margin: 'auto',
        maxWidth: '100%',
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    buttonBase: {
        alignSelf: 'center',
        color: 'white'
    },
    removeBtn: {
        margin: 'auto',
        backgroundColor: '#dc3545',
        color: 'white',
        padding: '7px',
        borderRadius: '10px'
    },
    priceTag: {
        margin: 'auto',
        padding: theme.spacing(2)
    }
}));

const CartProductCard = (props) => {
    const { removeFromCart } = useContext(CartContext);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item className={classes.image}>
                        <img className={classes.img} alt="complex" src={props.product.image} />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {props.product.name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {props.product.description}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <ButtonBase className={classes.removeBtn} onClick={() => removeFromCart(props.product)}>
                                    Remove
                                </ButtonBase>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.priceTag}>
                            <Typography variant="subtitle1">${props.product.price}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default CartProductCard;