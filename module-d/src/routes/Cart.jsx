import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Layout";
import { getOrderPrice } from "./Restaurant";
import axios from "axios";
import AuthContext from "../context/auth";

const Cart = () => {
    const auth = useContext(AuthContext);
    const params = useParams();
    const [cartItems, setCartItems] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);
    const [orderPrice, setOrderPrice] = useState(getOrderPrice());

    useEffect(() => {
        if (auth.token === null)
            window.location.href = "/";
        axios.get(
            "http://api.localhost/v1/restaurant/" + params["restaurantId"],
            { headers: { Authorization: "Bearer " + auth.token} }
        )
            .catch(() => window.location.href = "/");
    }, []);

    useEffect(() => {
        if (!cartItems.length)
            localStorage.removeItem("cart");
        else
            localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <>
            <Header />
            <div className="px-10 py-20">
                <h2 className="text-5xl font-bold mb-6">Finish Order</h2>
                <div className="flex flex-wrap gap-5 justify-center">
                    <div className="flex-grow">
                        <p className="text-xl font-bold mb-3">Your items</p>
                        <div className="p-3 flex flex-col gap-3">
                            {cartItems.length === 0 && (
                                <h3 className="">You have no items in the cart</h3>
                            )}
                            {cartItems.map((menuItem, index) => (
                                <div className="bg-white p-3 rounded-md border-2 flex center" key={index}>
                                    <p className="text-xl">{menuItem.name}</p>
                                    <p className="ms-auto text-xl text-purple-500 me-4">{menuItem.price}</p>
                                    <button 
                                        type="button" 
                                        className="text-4xl bg-purple-300 text-purple-800 px-2 pb-1 rounded-md hover:bg-purple-400"
                                        onClick={() => {
                                            setCartItems([...cartItems].filter((_, i) => i !== index));
                                            setOrderPrice(getOrderPrice());
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>

                        <p className="text-3xl mb-3">Total: {orderPrice} EUR</p>
                        <div>
                            <button 
                                className="p-3 rounded-lg bg-slate-100 text-purple-800 hover:bg-slate-50 font-bold shadow-md me-5"
                                onClick={() => {
                                    window.location.href = "/restaurant/" + params["restaurantId"];
                                }}
                            >
                                Go back
                            </button>
                            <button 
                                className="p-3 rounded-lg bg-purple-800 text-slate-200 hover:bg-purple-900 font-bold shadow-md"
                                onClick={() => {
                                    if (cartItems.length === 0)
                                        return;
                                    let quantities = {};
                                    cartItems.forEach(item => {
                                        if (Object.keys(quantities).indexOf(item.id) >= 0)
                                            quantities[item.id]++;
                                        else
                                            quantities[item.id] = 1;
                                    });

                                    console.log(
                                        Object.keys(quantities).map(key => ({
                                            menuItemId: key,
                                            quantity: quantities[key]
                                        }))
                                    );
                                    axios.post(
                                        `http://api.localhost/v1/restaurant/${params["restaurantId"]}/order`,
                                        {
                                            items: Object.keys(quantities).map(key => ({
                                                menuItemId: key,
                                                quantity: quantities[key]
                                            }))
                                        },
                                        { headers: { Authorization: "Bearer " + auth.token} }
                                    )
                                        .then(() => window.location.href = "/?ordered");
                                }}
                            >
                                Finish order
                            </button>
                        </div>
                    </div>

                    <img src="/assets/g10@3x.png" alt="scooterrrr" className="object-contain w-96" />
                </div>
            </div>

            {/* circle effect */}
            <div 
                className="w-60 h-60 absolute top-0 right-0 -z-10 bg-purple-800" 
                style={{ filter: "blur(200px)" }}
            />
        </>
    );
}

export default Cart;