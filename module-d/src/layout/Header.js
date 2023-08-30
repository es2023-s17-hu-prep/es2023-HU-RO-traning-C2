import * as PropTypes from "prop-types";
import {Logo} from "../components/logo/Logo";
import {ReactComponent as LogOutIcon} from "../components/icons/logout.svg";
import {useAuth} from "../hooks/useAuth";
import {Button} from "../components/buttons/Button";


/**
 * Header component
 * @param logoColor
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function Header({logoColor, children}) {
    const {setToken} = useAuth();

    function logout(){
        setToken('');
    }

    return <header className="max-w-7xl w-full mx-auto p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-30 box-border">
        <Logo color={logoColor} />

        <div className="flex items-center gap-4">
            {children}

            <Button variant="secondary" onClick={logout} startIcon={<LogOutIcon />}>Log out</Button>
        </div>
    </header>
}

Header.propTypes = {logoColor: PropTypes.string, children: PropTypes.node};