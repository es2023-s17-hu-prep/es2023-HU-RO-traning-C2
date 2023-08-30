import {useState} from "react";
import {TextField} from "../../components/form/TextField";
import {ReactComponent as MailIcon} from "../../components/icons/mail.svg";
import {ReactComponent as PasswordIcon} from "../../components/icons/lock-closed.svg";
import {RoundedButton} from "../../components/buttons/RoundedButton";
import {Link} from "react-router-dom";
import axios from "axios";
import {validateEmail} from "./utils";
import {Alert} from "../../components/alert/Alert";
import {useAuth} from "../../hooks/useAuth";

/**
 * Login form react component
 * @returns {null}
 * @constructor
 */
export function LoginForm() {
    const {setToken} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        setError('');

        if(!validateEmail(email)){
            setError('The email address is not valid');
            return;
        }

        try {
            const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {email, password})
            setToken(result.data.token);
        } catch (err) {
            if(err.response.status === 401){
                setError('Wrong email or password')
                return;
            }
            setError('Unexpected error, please try again')
        }
    }

    return <div className="flex flex-col mt-24 gap-4 max-w-md w-full mx-auto">
        <h2 className="font-semibold text-3xl">
            Sign in
        </h2>
        <p className="mb-8">
            You can <Link className="font-bold text-purple-600" to="/register">Register Here!</Link>
        </p>
        {error && <Alert>{error}</Alert> }
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField value={email} startIcon={<MailIcon />} onChange={setEmail} type="text" placeholder="Email" />
            <TextField value={password} startIcon={<PasswordIcon />} onChange={setPassword} type="password" placeholder="Password" />

            <div className="w-full flex flex-col mt-24">
                <RoundedButton variant="primary" type="submit">Login</RoundedButton>
            </div>
        </form>
    </div>
}