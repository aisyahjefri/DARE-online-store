const getToken = () => {
    return localStorage.getItem("token");
};

const setToken = ( token ) => {
    localStorage.setItem("token", token);
};

const removeToken = () => {
    localStorage.removeItem("token");
}

const authService = {
    getToken,
    setToken,
    removeToken
};

export default authService;