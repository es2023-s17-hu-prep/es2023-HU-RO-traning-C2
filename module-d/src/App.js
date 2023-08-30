import {AuthenticationContextProvider} from "./context/AuthenticationContext";
import {OrderContextProvider} from "./context/OrderContext";
import {AppRouter} from "./AppRouter";


function App() {
    return (
        <AuthenticationContextProvider>
            <OrderContextProvider>
                <AppRouter/>
            </OrderContextProvider>
        </AuthenticationContextProvider>
    );
}

export default App;
