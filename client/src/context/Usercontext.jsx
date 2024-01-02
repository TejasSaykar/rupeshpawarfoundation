import { useContext, useEffect } from "react";
import { createContext, useState } from "react";

export const UserContext = createContext();

const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const data = localStorage.getItem("user");
        if(data){
            const parseData = JSON.parse(data);
            setUser(parseData)
        }
    },[])

    // console.log("Context User",user)

    return(
        <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>
    )
}

const Auth = () => useContext(UserContext);

export  {Auth, ContextProvider}