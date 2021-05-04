import React, { createContext, useState } from "react";

const CartContext = createContext({
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    getCartTotal: () => { },
    cart: [],
});

const CartProvider = (props) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, { ...product }]);
    };

    const removeFromCart = (productToRemove) => {
        setCart(cart.filter((product) => product !== productToRemove));
    }

    const clearCart = () => {
        setCart([]);
    }

    const getCartTotal = () => {
        let total = cart.reduce((sum, { price }) => sum + price, 0);
        // total = (Math.round(total * 100) / 100).toFixed(2);
        total = total.toFixed(2);
        return total;
    }

    const value = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal
    }

    return (
        <CartContext.Provider value={value} >
            { props.children}
        </CartContext.Provider >
    );
};

export default CartContext;
export { CartProvider };