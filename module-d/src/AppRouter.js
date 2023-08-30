import {useAuth} from "./hooks/useAuth";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/auth/LoginPage";
import {RegistrationPage} from "./pages/auth/RegistrationPage";
import {SearchPage} from "./pages/search/SearchPage";
import {RestaurantPage} from "./pages/restaurants/RestaurantPage";
import {OrderPage} from "./pages/order/OrderPage";


/**
 * Application router
 * @returns {JSX.Element}
 * @constructor
 */
export function AppRouter() {
    const {isLoggedIn} = useAuth();

    return <BrowserRouter>
        {
            isLoggedIn ? (
                <Routes>
                    <Route path="/search" element={<SearchPage />}/>
                    <Route path="/restaurants/:id/order" element={<OrderPage />}/>
                    <Route path="/restaurants/:id" element={<RestaurantPage />}/>
                    <Route path="/" element={<Navigate to="search"/>}/>
                    <Route path="/*" element={<Navigate to="search"/>}/>
                </Routes>
            ) : (
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegistrationPage/>}/>
                    <Route path="/" element={<Navigate to="login"/>}/>
                    <Route path="/*" element={<Navigate to="login"/>}/>
                </Routes>
            )
        }
    </BrowserRouter>;
}