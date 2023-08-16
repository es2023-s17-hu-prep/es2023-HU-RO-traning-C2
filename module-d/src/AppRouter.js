import {useAuth} from "./hooks/useAuth";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/login/LoginPage";
import {RegisterPage} from "./pages/register/RegisterPage";
import {SearchPage} from "./pages/search/SearchPage";
import {RestaurantPage} from "./pages/restaurant/RestaurantPage";
import {OrderPage} from "./pages/order/OrderPage";

/**
 * Application routes based on authentication state
 * @returns {JSX.Element}
 * @constructor
 */
export function AppRouter() {
    const {isLoggedIn} = useAuth()

    if (isLoggedIn) {
        // Private routes
        return <BrowserRouter>
            <Routes>
                <Route path="search" element={<SearchPage />}/>
                <Route path="restaurants/:id/order" element={<OrderPage />}/>
                <Route path="restaurants/:id" element={<RestaurantPage />}/>

                <Route path="*" element={<Navigate to="search"/>}/>
                <Route path="/" element={<Navigate to="search"/>}/>
            </Routes>
        </BrowserRouter>
    }

    // Public routes
    return <BrowserRouter>
        <Routes>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="register" element={<RegisterPage />}/>
            <Route path="*" element={<Navigate to="login"/>}/>
            <Route path="/" element={<Navigate to="login"/>}/>
        </Routes>
    </BrowserRouter>
}