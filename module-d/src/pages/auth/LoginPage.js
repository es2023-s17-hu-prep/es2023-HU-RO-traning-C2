import {AuthLayout} from "./AuthLayout";
import {LoginForm} from "./LoginForm";


export function LoginPage() {
    return <AuthLayout title="Sign in to DineEase">
        <LoginForm />
    </AuthLayout>;
}