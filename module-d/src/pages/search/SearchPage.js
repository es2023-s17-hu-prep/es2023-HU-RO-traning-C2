import {BaseLayout} from "../../layout/BaseLayout";
import {Header} from "../../layout/Header";
import {TextField} from "../../components/form/TextField";
import {useEffect, useMemo, useState} from "react";
import {ReactComponent as SearchIcon} from "../../components/icons/search.svg";
import {Button} from "../../components/buttons/Button";
import axios from "axios";
import {useAuth} from "../../hooks/useAuth";
import {RestaurantCard} from "./RestaurantCard";


/**
 * Search Page react component
 * @returns {null}
 * @constructor
 */
export function SearchPage() {
    const {headers} = useAuth();
    const [query, setQuery] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const visibleRestaurants = useMemo(() => showMore ? restaurants : restaurants.slice(0, 6), [showMore, restaurants]);

    async function fetchRestaurants() {
        setLoading(true)
        const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/search?query=${query}`, {headers})
        setRestaurants(result.data.sort(() => Math.random() - 0.5));
        setLoading(false)
    }

    useEffect(() => {
        fetchRestaurants()
    }, [])

    function handleSearch(e) {
        e.preventDefault();

        fetchRestaurants();
    }

    return <BaseLayout>
        <Header logoColor="black"/>

        <div className="flex flex-col items-center gap-8 pt-32">
            <form onSubmit={handleSearch} className="flex flex-row gap-2 w-full max-w-md">
                <TextField value={query} onChange={setQuery} placeholder="Search for restaurants" type="search"
                           startIcon={<SearchIcon className="w-6 h-6 fill-gray-500"/>}/>
                <Button type="submit">
                    <SearchIcon className="w-8 h-8 fill-purple-500"/>
                </Button>
            </form>
            {
                loading && <span className="text-gray-700 italic text-center">Loading...</span>
            }
            <div className="grid grid-cols-3 gap-8 w-full max-w-7xl mx-auto p-4 justify-center">
                {
                    visibleRestaurants.map(r => <RestaurantCard key={r.id} data={r} />)
                }
            </div>
            {
                visibleRestaurants.length > 0 && <button className="font-bold text-purple-500 transition hover:bg-gray-100 rounded-lg p-2" onClick={() => setShowMore(v => !v)}>
                    {showMore ? "Show less" : "Show more"}
                </button>
            }
            {
                !loading && visibleRestaurants.length === 0 && <span className="text-gray-700 italic text-center">No restaurant found</span>
            }
        </div>
    </BaseLayout>
}