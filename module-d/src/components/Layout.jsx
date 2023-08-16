import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth";

export const Header = ({ absolute, white, children }) => {
    const auth = useContext(AuthContext);

    return (
        <header className={`flex justify-between items-center p-5 ${absolute ? "w-full absolute top-0 left-0 z-10" : ""}`}>
            <img src={white ? "/assets/Logo@3x-white.png" : "/assets/Logo@3x.png"} alt="logo" style={{
                height: "40px"
            }} />

            <div className="flex gap-3">
                {children}
                {auth.token !== null && (
                    <button 
                        className="header-button flex items-center gap-3"
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = "/";
                        }}
                    >
                        <img 
                            src="/assets/logout@3x.png" alt="logout" 
                            className="w-8 h-8"
                        />
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
}

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-center p-3">
            <p className="text-white">All rights reserved.</p>
        </footer>
    );
}

const Layout = ({ children }) => {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}

export default Layout;