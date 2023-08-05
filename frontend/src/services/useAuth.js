import * as React from "react";
import authService from "./auth.service";

const authContext = React.createContext();

function useAuth() {
    const [auth, setAuth] = React.useState(false);

    return ({
        auth,
        signin() {
            return new Promise((res) => {
                setAuth(true);
                res();
            });
        },
        signout() {
            return new Promise((res) => {
                setAuth(false);
                authService.removeToken();
                res();
            })
        },
    });
}

export function AuthProvider({ children }) {
    const auth = useAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
    return React.useContext(authContext);
}

