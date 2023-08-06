const getCart = () => {
    return localStorage.getItem("cart");
};

const setCart = ( cart ) => {
    localStorage.setItem("cart", cart);
};

const removeCart = () => {
    localStorage.removeItem("cart");
}

const cartService = {
    getCart,
    setCart,
    removeCart
};

export default cartService;