import React, { createContext, useState } from "react";

const CartContext = createContext({
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    getCartTotal: () => { },
    getCartAmount: () => { },
    getProductPrice: () => { },
    increaseQuantity: () => { },
    decreaseQuantity: () => { },
    cart: [],
});

const CartProvider = (props) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        let newCart = [...cart];
        let itemInCart = newCart.find(
            (item) => product.name === item.name
        );
        if (itemInCart) {
            itemInCart.quantity++;
        } else {
            itemInCart = {
                ...product,
                quantity: 1,
            }
            newCart.push(itemInCart);
        }
        setCart(newCart);
    };

    const removeFromCart = (productToRemove) => {
        setCart(cart.filter((product) => product !== productToRemove));
    }

    const clearCart = () => {
        setCart([]);
    }

    const getCartTotal = () => {
        let total = cart.reduce((sum, { price, quantity }) => sum + price * quantity, 0);
        // total = (Math.round(total * 100) / 100).toFixed(2);
        total = total.toFixed(2);
        return total;
    }

    const getCartAmount = () => {
        return cart.reduce((sum, { quantity }) => sum + quantity, 0);
    }

    const getProductPrice = (product) => {
        let productPrice = product.price;
        productPrice = productPrice.toFixed(2);
        return productPrice;
    }

    const increaseQuantity = (product) => {
        product.quantity++;
        let newCart = [...cart];
        setCart(newCart);
    }

    const decreaseQuantity = (product) => {
        product.quantity--;
        if (product.quantity === 0) {
            console.log("here");
            removeFromCart(product);
        } else {
            let newCart = [...cart];
            setCart(newCart);
        }
    }

    const value = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartAmount,
        getProductPrice,
        increaseQuantity,
        decreaseQuantity
    }

    return (
        <CartContext.Provider value={value} >
            { props.children}
        </CartContext.Provider >
    );
};

export default CartContext;
export { CartProvider };