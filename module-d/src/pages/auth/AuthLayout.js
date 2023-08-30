import {Logo} from "../../components/logo/Logo";
import {LoginIllustration} from "../../components/illustrations/LoginIllustration";
import * as PropTypes from "prop-types";

/**
 * Layout for authentication
 * @param title
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function AuthLayout({title, children}) {
    return <div className="w-full h-screen flex flex-row gap-12 p-4">
        <div className="flex flex-col w-full p-4">
            <Logo/>

            <div className="p-8">
                {children}
            </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 rounded-2xl bg-purple-600 w-full">
            <LoginIllustration/>

            <h1 className="text-white font-bold text-4xl">{title}</h1>
        </div>
    </div>
}


AuthLayout.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
};