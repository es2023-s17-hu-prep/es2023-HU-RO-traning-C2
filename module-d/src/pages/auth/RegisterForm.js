import {useState} from "react";
import {TextField} from "../../components/form/TextField";
import {ReactComponent as MailIcon} from "../../components/icons/mail.svg";
import {ReactComponent as PasswordIcon} from "../../components/icons/lock-closed.svg";
import {ReactComponent as UserIcon} from "../../components/icons/user.svg";
import {RoundedButton} from "../../components/buttons/RoundedButton";
import axios from "axios";
import {validateEmail} from "./utils";
import {Alert} from "../../components/alert/Alert";
import {useAuth} from "../../hooks/useAuth";
import {Link} from "react-router-dom";

/**
 * Register form react component
 * @returns {null}
 * @constructor
 */
export function RegisterForm() {
    const {setToken} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        setError('');

        if (!validateEmail(email)) {
            setError('The email address is not valid');
            return;
        }

        if (password !== passwordConfirmation) {
            setError('The passwords don\'t match');
            return;
        }

        try {
            const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, {email, password, name})
            setToken(result.data.token);
        } catch (err) {
            if(err.response.data){
                setError(err.response.data.error)
                return;
            }
            setError('Unexpected error, please try again')
        }
    }

    return <div className="flex flex-col mt-24 gap-4 max-w-md w-full mx-auto">
        <h2 className="font-semibold text-3xl">
            Register
        </h2>
        <p className="mb-8 text-lg">
            If you don't have a DineEase account, <br/> you can register one here
        </p>
        {error && <Alert>{error}</Alert>}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField value={name} startIcon={<UserIcon/>} onChange={setName} type="text" placeholder='Name'/>
            <TextField value={email} startIcon={<MailIcon/>} onChange={setEmail} type="email" placeholder='Email'/>
            <TextField value={password} startIcon={<PasswordIcon/>} onChange={setPassword} type="password"
                       placeholder='Password'/>
            <TextField value={passwordConfirmation} startIcon={<PasswordIcon/>} onChange={setPasswordConfirmation}
                       type="password" placeholder="Password confirmation"/>

            <div className="w-full flex flex-col gap-4 mt-24">
                <RoundedButton variant="primary" type="submit">Register</RoundedButton>
                <Link className="w-full flex flex-col" to="/login">
                    <RoundedButton variant="secondary" type="submit">Back to login</RoundedButton>
                </Link>
            </div>
        </form>
    </div>
}