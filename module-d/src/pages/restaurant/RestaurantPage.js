import {useParams} from "react-router-dom";
import {BaseLayout} from "../../layout/BaseLayout";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../hooks/useAuth";
import {Header} from "../../layout/Header";
import {Rating} from "../../components/Rating";
import {MenuItem} from "../../components/MenuItem";
import {Review} from "../../components/Review";
import {ReviewForm} from "../../components/ReviewForm";
import {useOrder} from "../../hooks/useOrder";
import {OrderSummary} from "./OrderSummary";

/**
 * Component for displaying the restaurant detail page
 * @returns {JSX.Element|null}
 * @constructor
 */
export function RestaurantPage() {
    const {id} = useParams();
    const {header} = useAuth();
    const {addItem} = useOrder();

    const [restaurant, setRestaurant] = useState(null);

    // Load the restaurant data
    async function load(){
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/restaurant/${id}`, {headers: {Authorization: header}})
        setRestaurant(response.data)
    }

    // Save a new review and reload the data
    async function handleReview(data){
        await axios.post(`${process.env.REACT_APP_BASE_URL}/restaurant/${id}/reviews`, data,{headers: {Authorization: header}})
        load()
    }

    // Load the restaurant on render
    useEffect(() => {
        load()
    }, [])

    // Wait for the result
    if (!restaurant) return null;

    return <BaseLayout hideBg>
        <div className="relative">
            <div className="absolute z-10 top-0 left-0 right-0">
                <Header color="white">
                    <OrderSummary restaurantId={id} />
                </Header>
            </div>
            <div className="bg-gradient-to-b from-[#00000060] to-[#00000000] absolute top-0 bottom-0 left-0 right-0"></div>
            <img src="/restaurant.webp" className="h-64 w-full object-cover" />
        </div>
        <div className="flex flex-col gap-4 mx-auto max-w-7xl w-full px-4 pt-6">
            <h1 className="text-4xl font-bold">{restaurant.name}</h1>
            <div className="flex items-center gap-1">
                {restaurant.averageRating.toFixed(2)}
                <Rating value={Math.round(restaurant.averageRating)} />
            </div>
            <p className="max-w-md w-full">
                {restaurant.description}
            </p>
            <div className="flex gap-4">
                <div className="flex flex-col flex-grow gap-4">
                    <h2 className="font-bold text-xl mb-4">Menu</h2>
                    {restaurant.menuItems.map(item => <MenuItem key={item.id} {...item} icon="add" onClick={() => addItem(item)} />)}
                </div>
                <div className="flex flex-col w-1/3 gap-4">
                    <h2 className="font-bold text-xl mb-4">Reviews</h2>
                    {restaurant.ratings.map(item => <Review key={item.id} {...item} />)}
                    <ReviewForm onSubmit={handleReview} />
                </div>
            </div>
        </div>
    </BaseLayout>
}