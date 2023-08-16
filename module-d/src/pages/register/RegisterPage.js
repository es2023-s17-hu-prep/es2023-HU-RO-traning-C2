import {Logo} from "../../components/Logo";
import {RegisterForm} from "./RegisterForm";
import {AuthSidebar} from "../../components/AuthSidebar";

/**
 * Register page react component
 * @returns {JSX.Element}
 */
export function RegisterPage() {
    return <div className="flex w-screen h-screen overflow-hidden p-4">
        <div className="flex w-full flex-col h-full">
            <Logo className="flex-shrink-0 h-32"/>
            <div className="flex flex-col p-8 mt-16 w-full items-center">
                <div className="flex flex-col max-w-sm w-full ">
                    <h2 className="text-2xl font-medium mb-2">Register</h2>
                    <p>If you don't have a DineEase account, you can register one here</p>
                    <RegisterForm/>
                </div>
            </div>
        </div>
        <AuthSidebar>Sign up to DineEase</AuthSidebar>
    </div>;
}