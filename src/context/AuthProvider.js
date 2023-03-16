import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const value = localStorage.getItem("jwt");
        if(value){
            let jwt = value.split(".")[1];
            jwt = atob(jwt);
            const status = (JSON.parse(jwt).status);
            const pseudo = (JSON.parse(jwt).value.pseudo);
            
            setAuth({accessToken : value, status : status, pseudo : pseudo})
            if(window.location.pathname === "/") {
                window.location.pathname += "DashBoard";
            }
        
        }
    }, []);
    

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;