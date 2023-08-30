/**
 * Hook for authentication
 */
import {useContext} from "react";
import {AuthenticationContext} from "../context/AuthenticationContext";

export function useAuth(){
    const context = useContext(AuthenticationContext);

    if(!context) throw new Error("The useAuth hook can only be used inside the AuthenticationContextProvider")
    
    return {...context, isLoggedIn: context.token !== "", headers: {authorization: `Bearer ${context.token}`}};
}