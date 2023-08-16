import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "../components/Layout";
import Loading from "../components/Loading";
import Stars from "../components/Stars";
import AuthContext from "../context/auth";

export function getOrderPrice() {
    if (!localStorage.getItem("cart"))
        return 0; 
    const items = JSON.parse(localStorage.getItem("cart"));
    let sum = 0
    items.forEach(item => sum += item.price);
    return sum;
}

const Restaurant = () => {
    const auth = useContext(AuthContext);
    const params = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [orderPrice, setOrderPrice] = useState(0);

    useEffect(() => {
        if (auth.token === null)
            window.location.href = "/";
        localStorage.removeItem("cart");
    }, []);

    useEffect(() => {
        if (restaurant === null)
            axios.get(
                "http://api.localhost/v1/restaurant/" + params["id"],
                { headers: { Authorization: "Bearer " + auth.token} }
            )
                .then((resp) => setRestaurant(resp.data))
                .catch(() => setNotFound(false));
    }, [restaurant]);

    if (restaurant === null)
        return <Loading />
    if (notFound)
        return (
            <h1 className="text-center pt-10">Restaurant not found</h1>
        );
    return (
        <>
            <Header absolute white>
                <Link to={"/cart/" + restaurant.id} className="header-button">Finish Order ({orderPrice} EUR)</Link>
            </Header>
            <div className="min-w-screen min-h-screen">
                <img 
                    src="/assets/Restaurant3@3x.png" alt="restaurant" 
                    className="w-screen h-96 object-cover" 
                    style={{ filter: "brightness(60%)", zIndex: "-100" }}
                /> 

                <div className="py-5 px-10 w-full">
                    <h2 className={"text-4xl font-bold mb-2"}>{restaurant.name}</h2>
                    <div className="flex items-center mb-2">
                        <div className="me-3">{restaurant.averageRating}</div>
                        <Stars rating={restaurant.averageRating} />
                    </div>
                    <p className="mb-4">{restaurant.description}</p>

                    <div className="flex flex-wrap gap-5 w-full">
                        <div className="flex-grow">
                            <h3 className={"text-2xl font-bold"}>Menu items</h3>
                            <div className="p-3 flex flex-col gap-3">
                                {restaurant.menuItems.map((menuItem, index) => (
                                    <div className="bg-white p-3 rounded-md border-2 flex items-center" key={index}>
                                        <p className="text-xl">{menuItem.name}</p>
                                        <p className="ms-auto text-xl text-purple-500 me-4">{menuItem.price}</p>
                                        <button 
                                            type="button" 
                                            className="text-4xl bg-purple-300 text-purple-800 px-2 pb-1 rounded-md hover:bg-purple-400"
                                            onClick={() => {
                                                const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
                                                cart.push(menuItem);
                                                localStorage.setItem("cart", JSON.stringify(cart));
                                                setOrderPrice(getOrderPrice());
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-grow">
                            <h3 className={"text-2xl font-bold"}>Reviews</h3>
                            <div className="p-3 flex flex-col gap-3">
                                {restaurant.ratings.map((rating, index) => (
                                    <div className="bg-white p-3 rounded-md" key={index}>
                                        <span className="flex w-full justify-between pb-2 mb-2 border-b-2">
                                            <h3 classname="text-xl font-bold">{rating.reviewer}</h3>
                                            <Stars rating={rating.rating} />
                                        </span>
                                        <p>{rating.comment}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-white p-3 rounded-md">
                                <h2 className="mb-3">Have any thoughts? Share it with us! </h2>
                                <form className="flex gap-3" onSubmit={(e) => {
                                    e.preventDefault();
                                    const data = new FormData(e.target);
                                    if (!data.get("comment"))
                                        return;
                                    axios.post(
                                        `http://api.localhost/v1/restaurant/${restaurant.id}/reviews`,
                                        {
                                            rating: 5,
                                            comment: data.get("comment")
                                        },
                                        { headers: { Authorization: "Bearer " + auth.token} }
                                    )
                                        .then(() => setRestaurant(null));
                                }}>
                                    <input 
                                        type="text" name="comment" placeholder="Review" 
                                        className="w-full text-xl bg-slate-100 hover:bg-slate-50 py-2 px-4 rounded-md" 
                                    />
                                    <button 
                                        type="submit"
                                        className="p-3 rounded-lg bg-purple-800 text-slate-200 hover:bg-purple-900 font-bold shadow-md"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Restaurant;