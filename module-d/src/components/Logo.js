import {ReactComponent as LogoIcon} from "./illustrations/logo.svg";
import {ReactComponent as LogoWhiteIcon} from "./illustrations/logo-white.svg";
import {Link} from "react-router-dom";

/**
 * Default black logo
 * @returns {JSX.Element}
 * @constructor
 */
export function Logo() {
    return <Link to="/"><LogoIcon/></Link>;
}

/**
 * Logo with white text
 * @returns {JSX.Element}
 * @constructor
 */
export function LogoWhite() {
    return <Link to="/"><LogoWhiteIcon/></Link>;
}