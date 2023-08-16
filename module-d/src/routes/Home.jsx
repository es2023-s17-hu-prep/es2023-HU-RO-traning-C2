import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { Header } from "../components/Layout";

import AuthContext from "../context/auth";
import Stars from "../components/Stars";

const Dashboard = () => {
    const auth = useContext(AuthContext);
    const location = useLocation();

    const [restaurants, setRestaurants] = useState(null);
    const [query, setQuery] = useState("");

    const [page, setPage] = useState(1);
    const pageSize = 6;

    useEffect(() => {
        setRestaurants(null);
        axios.get("http://api.localhost/v1/search", {
            headers: { "Authorization": "Bearer " + auth.token },
            params: { query }
        })
            .then(resp => setRestaurants(resp.data));
    }, [query]);

    if (restaurants === null)
        return <Loading />
    return (
        <>
            <Header />
            <section className="px-20 py-10">
                {location.search === "?ordered" && (
                    <h2 className="text-center mb-10 text-2xl text-green-800">Ordered place succesfully</h2>
                )}
                <form 
                    className="flex items-center gap-3 mb-4 justify-center"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.target);
                        setQuery(data.get("query"));
                    }}
                >
                    <input 
                        type="text" placeholder="Search" name="query"
                        className="text-xl bg-slate-100 hover:bg-slate-50 py-2 px-4 rounded-md" 
                    />
                    <button type="submit" className="bg-purple-200 border-2 border-purple-400 hover:bg-purple-300 h-full apsect-square p-3 rounded-md">
                        <img 
                            src="/assets/Search Icon@3x.png" alt="search" 
                            style={{ width: "30px", height: "30px" }}
                        />
                    </button>
                </form>
                <div className="grid grid-cols-3 gap-5">
                    {restaurants.length === 0 && (
                        <div className="w-full h-96 flex justify-center items-center">
                            <h2 className="text-3xl text-center">{"No restaurants found"}</h2>
                        </div>
                    )}
                    {Array.from(new Array(Math.min(restaurants.length, page * pageSize))).map((_, index) => (
                        <div key={index} className="p-3 rounded-md bg-white w-96 mx-auto">
                            <img 
                                src="/assets/Restaurant3@3x.png" 
                                alt="cute restaurant" 
                                className="object-cover rounded-md shadow-sm w-full mb-3"
                                style={{ height: "240px" }}
                            />
                            <div className={"flex flex-wrap gap-2 justify-between items-center mb-3"}>
                                <h3 className="text-xl font-bold">{restaurants[index].name}</h3> 
                                <Stars rating={restaurants[index].averageRating} />
                            </div>
                            <p>{restaurants[index].description}</p>
                            <Link 
                                to={`/restaurant/${restaurants[index].id}`}
                                className="font-bold text-purple-700 hover:text-purple-800 block text-right ms-auto"
                            >
                                {"Continue >>"}
                            </Link>
                        </div>
                    ))}
                </div> 
                {(page + 1) * pageSize <= restaurants.length && (
                    <button 
                        type="button" 
                        onClick={() => setPage(page + 1)}
                        className="block mx-auto mt-5 text-xl text-purple-800 hover:text-purple-900 hover:underline"
                    >
                        View more...
                    </button>
                )}
            </section>

            {/* circle effect */}
            <div 
                className="w-60 h-60 absolute top-0 right-0 -z-10 bg-purple-800" 
                style={{ filter: "blur(200px)" }}
            />
        </>
    );
}

const Home = () => {
    const auth = useContext(AuthContext);
    const [error, setError] = useState(false);
    
    if (auth.token !== null)
        return <Dashboard />;
    return (
        <>
            <Header absolute={true} />
            <div className="w-screen h-screen flex">
                <form 
                    className="flex flex-col justify-between px-10 py-32 text-center" 
                    style={{ width: "120%" }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.target);
                        axios.post("http://api.localhost/v1/login", {
                            "email": data.get("email"),
                            "password": data.get("password")
                        }) 
                            .then(resp => {
                                localStorage.setItem("token", resp.data.token);
                                localStorage.setItem("user", {
                                    "user_id": resp.data.user_id,
                                    "name": resp.data.name,
                                    "email": resp.data.email
                                });

                                window.location.reload();
                            })
                            .catch(() => setError(true));
                    }}
                >
                    {error && ( 
                        <span className="bg-red-300 border-red-400 border-4 rounded-md p-4 mb-3">
                            <p>Either email or password is wrong, grammer left the chat</p>
                        </span> 
                    )}

                    <div className="text-justify">
                        <h2 className="text-3xl font-bold mb-2">Sign in</h2>
                        <p >You can <Link to={"/register"} className="font-bold text-purple-700 hover:text-purple-800">Register here!</Link></p>
                    </div>

                    <div>
                        <input type={"email"} required name="email" placeholder="Email" className="form-input" />
                        <input type={"password"} required name="password" placeholder="Password" className="form-input" />
                    </div>

                    <button 
                        type="submit" 
                        className="bg-purple-800 text-white p-3 rounded-md mx-auto hover:bg-purple-700"
                        style={{ width: "60%" }}
                    > 
                        Login
                    </button>
                </form>
                <div className="flex flex-col justify-center items-center bg-purple-800 w-full m-10 rounded-md">
                    <img src="/assets/Wavy_F_D-01_Single-11 2@3x.png" alt="man eating" style={{ height: "400px" }}></img>
                    <h3 className="text-3xl font-bold text-white">Sign in to DineEase</h3>
                </div>
            </div>
        </>
    );
}

export default Home;