import {AuthLayout} from "./AuthLayout";
import {RegisterForm} from "./RegisterForm";

export function RegistrationPage() {
    return <AuthLayout title="Sign up to DineEase">
        <RegisterForm />
    </AuthLayout>;
}