import {useAuth} from "../../hooks/useAuth";
import {useState} from "react";
import axios from "axios";
import {TextField} from "../../components/TextField";
import {ReactComponent as MailIcon} from "../../components/icons/mail.svg";
import {ReactComponent as PasswordIcon} from "../../components/icons/lock-closed.svg";
import {ReactComponent as UserIcon} from "../../components/icons/user.svg";
import {Button} from "../../components/Button";
import {Link} from "react-router-dom";

/**
 * Register form react component
 * @returns {JSX.Element}
 */
export function RegisterForm() {
    const {setToken} = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [error, setError] = useState("")

    // Handle the form submit event
    async function handleSubmit(e) {
        e.preventDefault()
        setError("")

        if (name === "") {
            setError("The name is required")
            return;
        }

        if (email === "") {
            setError("The email is required")
            return;
        }

        if (password.length < 8) {
            setError("The password has to be minimum 8 characters long")
            return;
        }

        if (password !== passwordConfirmation) {
            setError("The passwords must match!")
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/register`, {
                email,
                password,
                name
            })
            setToken(response.data.token);
        } catch (e) {
            setError(e.response.data.error)
        }
    }

    return <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        {error && <div className="p-2 rounded-md bg-red-300 border-red-800 text-red-800">{error}</div>}
        <TextField value={name} onChange={e => setName(e.target.value)} placeholder="Name"
                   icon={<UserIcon/>} fullWidth type="text" autoFocus/>
        <TextField value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
                   icon={<MailIcon/>} fullWidth type="email"/>
        <TextField value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
                   icon={<PasswordIcon/>} fullWidth type="password"/>
        <TextField value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)}
                   placeholder="Password confirmation"
                   icon={<PasswordIcon/>} fullWidth type="password"/>

        <div className="flex flex-col gap-3 mt-4">
            <Button variant="primary" type="rounded" onClick={handleSubmit}>Register</Button>
            <Link className="w-full" to="/login">
                <Button fullWidth variant="secondary" type="rounded">Back to login</Button>
            </Link>
        </div>
    </form>
}