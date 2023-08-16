import React from "react";
import { Header } from "../components/Layout";

const Fallback = () => {
    return (
        <>
            <Header absolute />
            <div className="min-w-screen min-h-screen flex justify-center items-center">
                <h1 className="text-3xl font-bold text-center">
                    {"Page not found :("}
                </h1>
            </div>
        </>
    );
}

export default Fallback;