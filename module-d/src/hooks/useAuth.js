import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

/**
 * Hook for getting the auth token
 * @returns {{setToken: function(), isLoggedIn: boolean, header: string, token: string}}
 */
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuth can only be used inside the AuthContextProvider")

    return {...context, isLoggedIn: context.token !== '', header: `Bearer ${context.token}`}
}