import {ReactComponent as HeroIllustration} from "./illustrations/hero.svg";

/**
 * Auth sidebar react component
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function AuthSidebar({children}) {
    return <div className="w-full h-full bg-purple-800 rounded-xl flex flex-col justify-center items-center">
        <HeroIllustration className="w-96"/>
        <h1 className="text-2xl font-bold text-white text-center">{children}</h1>
    </div>;
}