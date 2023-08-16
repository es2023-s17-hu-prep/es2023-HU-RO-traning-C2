import React, { useContext, useState } from "react";
import AuthContext from "../context/auth";
import axios from "axios";
import { Link, redirect } from "react-router-dom";
import { Header } from "../components/Layout";

const Register = () => {
    const auth = useContext(AuthContext);
    const [error, setError] = useState(null);
    
    if (auth.token !== null)
        return (
            <p>authenticated</p>
        );
    return (
        <>
            <Header absolute />
            <div className="w-screen h-screen flex">
                <form 
                    className="flex flex-col justify-between px-10 py-32 text-center" 
                    style={{ width: "120%" }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.target);
                        if (data.get("password") !== data.get("confirm-password")) {
                            setError("Password and Confirm Password fields should match");
                            return;
                        }
                        axios.post("http://api.localhost/v1/register", {
                            "name": data.get("name"),
                            "email": data.get("email"),
                            "password": data.get("password")
                        }) 
                            .then(resp => window.location.href = "/")
                            .catch(err => setError(err.response.data.error));
                    }}
                >
                    {error && ( 
                        <span className="bg-red-300 border-red-400 border-4 rounded-md p-4 mb-3">
                            <p>{error}</p>
                        </span> 
                    )}

                    <div className="text-justify">
                        <h2 className="text-3xl font-bold mb-2">Register</h2>
                        <p>If you don't have a DineEase account, you can register one here</p>
                    </div>

                    <div>
                        <input type={"text"} required name="name" placeholder="Name" className="form-input" />
                        <input type={"email"} required name="email" placeholder="Email" className="form-input" />
                        <input type={"password"} required name="password" placeholder="Password" className="form-input" />
                        <input type={"password"} required name="confirm-password" placeholder="Confirm Password" className="form-input" />
                    </div>

                    <div>
                        <button 
                            type="submit" 
                            className="bg-purple-800 text-white p-3 rounded-md mx-auto hover:bg-purple-700 mb-3"
                            style={{ width: "60%" }}
                        > 
                            Register
                        </button>
                        <Link 
                            to="/"
                            className="block bg-zinc-100 text-purple-700 p-3 rounded-md mx-auto hover:bg-zinc-50"
                            style={{ width: "60%" }}
                        > 
                            Back to login
                        </Link>
                    </div>
                </form>
                <div className="flex flex-col justify-center items-center bg-purple-800 w-full m-10 rounded-md">
                    <img src="/assets/Wavy_F_D-01_Single-11 2@3x.png" alt="man eating" style={{ height: "400px" }}></img>
                    <h3 className="text-3xl font-bold text-white">Sign up to DineEase</h3>
                </div>
            </div>

            {/* THE ALMIGHTY STAR */}
            <img 
                alt="almighty star" 
                src="/assets/Star Icon@3x.png" 
                className="absolute top-20 left-32 w-12 h-12"
            />
        </>
    );
}

export default Register;