import {useAuth} from "../../hooks/useAuth";
import {useState} from "react";
import axios from "axios";
import {TextField} from "../../components/TextField";
import {ReactComponent as MailIcon} from "../../components/icons/mail.svg";
import {ReactComponent as PasswordIcon} from "../../components/icons/lock-closed.svg";
import {Button} from "../../components/Button";

/**
 * Login form react component
 * @returns {JSX.Element}
 */
export function LoginForm() {
    const {setToken} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("")

    // Handle the form submit event
    async function handleSubmit(e) {
        e.preventDefault()
        setError("")

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
                email,
                password
            })
            setToken(response.data.token);
        } catch (e) {
            setError(e.response.data.error)
        }
    }

    return <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-12">
        {error && <div className="p-2 rounded-md bg-red-300 border-red-800 text-red-800">{error}</div>}
        <TextField value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
                   icon={<MailIcon/>} fullWidth type="email" autoFocus/>
        <TextField value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
                   icon={<PasswordIcon/>} fullWidth type="password"/>

        <div className="flex flex-col gap-3 mt-16">
            <Button variant="primary" type="rounded" onClick={handleSubmit}>Login</Button>
        </div>
    </form>
}