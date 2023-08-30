import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../hooks/useAuth";
import {BaseLayout} from "../../layout/BaseLayout";
import {Header} from "../../layout/Header";
import {Rating} from "../../components/rating/Rating";
import {useOrder} from "../../hooks/useOrder";
import {MenuItem} from "../../components/menu/MenuItem";
import {Button} from "../../components/buttons/Button";
import {Review} from "../../components/review/Review";
import {ReviewForm} from "../../components/review/ReviewForm";

/**
 * React component for displaying the restaurant detail page
 * @constructor
 */
export function RestaurantPage() {
    const {addItem, total} = useOrder();
    const {headers} = useAuth();
    const {id} = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(false);

    async function load() {
        setLoading(true)
        const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/restaurant/${id}`, {headers})
        setRestaurant(result.data);
        setLoading(false)
    }

    async function saveReview(data) {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/restaurant/${id}/review`, data, {headers})
        load()
    }

    useEffect(() => {
        load()
    }, [id])

    if (!restaurant){
        return <BaseLayout>
            <Header/>
            <div className="flex justify-center items-center w-full h-screen">
                <span className="text-gray-700 italic text-center">Loading...</span>
            </div>
        </BaseLayout>;
    }

    return <BaseLayout>
        <Header logoColor="white">
            {
                total > 0 && <Link to="order">
                    <Button variant="secondary">
                        Finish Order ({total.toFixed(2)} EUR)
                    </Button>
                </Link>
            }
        </Header>

        <div className="flex flex-col gap-8">
            <div className="w-screen h-[500px] relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,.5)] to-transparent"></div>
                <img className="w-full h-full object-cover" src="/restaurant.webp" alt={restaurant?.name}/>
            </div>
            {
                loading && <span className="text-gray-700 italic text-center">Loading...</span>
            }
            <div className="mx-auto max-w-7xl w-full p-4 flex flex-col gap-3 box-border">
                <h1 className="font-bold text-6xl">{restaurant.name}</h1>
                <div className="flex flex-row gap-2 items-center">
                    <span className="text-gray-600">{restaurant.averageRating.toFixed(2)}</span> <Rating
                    value={Math.round(restaurant.averageRating)} readOnly/>
                </div>
                <p className="text-gray-600">
                    {restaurant.description}
                </p>

                <div className="flex flex-row justify-between gap-4">
                    <div className="flex flex-col gap-4 w-full">
                        <h2 className="text-xl font-bold">Menu</h2>
                        {
                            restaurant.menuItems.map(item => <MenuItem variant="add" key={item.id} data={item}
                                                                       onClick={() => addItem(item)}/>)
                        }
                        {
                            restaurant.menuItems.length === 0 &&
                            <span className="text-gray-700 italic">No menu items</span>
                        }
                    </div>
                    <div className="flex flex-col gap-4 max-w-md w-full">
                        <h2 className="text-xl font-bold">Reviews</h2>
                        {
                            restaurant.ratings.map(item => <Review key={item.id} data={item}/>)
                        }
                        <ReviewForm onSubmit={saveReview}/>
                        {
                            restaurant.ratings.length === 0 && <span className="text-gray-700 italic">No reviews</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    </BaseLayout>
}