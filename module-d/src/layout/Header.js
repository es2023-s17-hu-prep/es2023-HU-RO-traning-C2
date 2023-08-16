import {useAuth} from "../hooks/useAuth";
import {Logo, LogoWhite} from "../components/Logo";
import {Button} from "../components/Button";
import {ReactComponent as LogoutIcon} from "../components/icons/logout.svg";

export function Header({children, color}) {
    const {setToken} = useAuth();

    function logout() {
        setToken('')
    }

    return <header className="w-full flex justify-between p-4 items-center max-w-7xl mx-auto">
        {color === 'white' ? <LogoWhite/> : <Logo/>}
        <div className="flex gap-2">
            {children}
            <Button onClick={logout} variant="secondary" icon={<LogoutIcon/>}>
                Log out
            </Button>
        </div>
    </header>
}