import {createContext} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";

/**
 * Context for storing the authentication session
 * @type {React.Context<{setToken: setToken, token: string}>}
 */
export const AuthContext = createContext({token: '', setToken: () => {}})

/**
 * Authentication context provider
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function AuthContextProvider({children}){
    const [token, setToken] = useLocalStorage('token', '');

    return <AuthContext.Provider value={{token, setToken}}>
        {children}
    </AuthContext.Provider>
}