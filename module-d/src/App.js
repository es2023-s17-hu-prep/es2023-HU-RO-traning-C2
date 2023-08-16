import './App.css';
import {AuthContextProvider} from "./context/AuthContext";
import {AppRouter} from "./AppRouter";
import {OrderContextProvider} from "./context/OrderContext";

/**
 * Application entrypoint
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    return (
        <AuthContextProvider>
            <OrderContextProvider>
                <AppRouter/>
            </OrderContextProvider>
        </AuthContextProvider>
    );
}

export default App;
