    import { useContext } from "react";
    import { createContext, useState, useEffect } from "react";

    const AuthContext = createContext();

    export const AuthContextProvider = ({children})=>{
        const [user, setUser] = useState(null)
        const [token, setToken] = useState(localStorage.getItem("token"))
        useEffect(()=>{
            
            if (token) { 
                const token = localStorage.getItem("token")
            const decode = JSON.parse(atob(token.split('.')[1]))
            if(decode.exp * 1000 < Date.now()){
                localStorage.removeItem('token')
            }else{
                setUser(decode)
            }
            
            }
            console.log(user)
        }, [])

        const logout = ()=>{
            localStorage.removeItem("token")
            setUser(null)
            
        }


        return(
            <AuthContext.Provider value={{user, setUser, logout, token}}>
                {children}
            </AuthContext.Provider>
        )
    }

    export const useAuth = ()=>{
        return useContext(AuthContext)
    }