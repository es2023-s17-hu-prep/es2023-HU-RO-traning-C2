import {ReactComponent as BaseLogo} from "./logo.svg";
import {ReactComponent as BaseLogoWhite} from "./logo-white.svg";
import {Link} from "react-router-dom";

/**
 * Logo react component
 */
export function Logo({color = 'black'}) {
    return <Link to="/">
        {color==='white' ? <BaseLogoWhite /> : <BaseLogo />}
    </Link>;
}