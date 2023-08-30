import {createContext} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";
import * as PropTypes from "prop-types";

/**
 * Context for storing authentication state
 * @type {React.Context<{setToken(v: string), token: string}>}
 */
export const AuthenticationContext = createContext({
    token: "", setToken() {
    }
});

/**
 * Authentication context provider react component
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function AuthenticationContextProvider({children}) {
    const [token, setToken] = useLocalStorage('token', '');
    return <AuthenticationContext.Provider value={{token, setToken}}>
        {children}
    </AuthenticationContext.Provider>
}

AuthenticationContextProvider.propTypes = {children: PropTypes.node};