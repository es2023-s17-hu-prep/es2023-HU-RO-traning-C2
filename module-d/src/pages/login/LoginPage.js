import {Logo} from "../../components/Logo";
import {Link} from "react-router-dom";
import {LoginForm} from "./LoginForm";
import {AuthSidebar} from "../../components/AuthSidebar";

/**
 * Login page react component
 * @returns {JSX.Element}
 */
export function LoginPage() {
    return <div className="flex w-screen h-screen overflow-hidden p-4">
        <div className="flex w-full flex-col h-full">
            <Logo/>
            <div className="flex flex-col p-8 mt-16 w-full items-center">
                <div className="flex flex-col max-w-sm w-full ">
                    <h2 className="text-2xl font-medium mb-2">Sign in</h2>
                    <p>You can <Link to="/register" className="font-bold text-purple-800">Register here!</Link></p>
                    <LoginForm/>
                </div>
            </div>
        </div>
        <AuthSidebar>Sign in to DineEase</AuthSidebar>
    </div>;
}