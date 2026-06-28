import { useContext } from "react";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [user, setUser] = useState(null)
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if (token) {
        const decode = JSON.parse(atob(token.split('.')[1]))
        if(decode.exp * 1000 < Date.now()){
            localStorage.removeItem('token')
        }else{
            setUser(decode)
        }
        }
    }, [])

    const logout = ()=>{
        localStorage.removeItem("token")
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user, setUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    return useContext(AuthContext)
}