import {Header} from "../../layout/Header";
import {TextField} from "../../components/TextField";
import {useEffect, useReducer, useState} from "react";
import {ReactComponent as SearchIcon} from "../../components/icons/search.svg";
import {Button} from "../../components/Button";
import axios from "axios";
import {useAuth} from "../../hooks/useAuth";
import {RestaurantCard} from "../../components/RestaurantCard";
import {BaseLayout} from "../../layout/BaseLayout";

/**
 * Search page react component
 * @returns {JSX.Element}
 * @constructor
 */
export function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    // Show more toggle
    const [showMore, toggleShowMore] = useReducer((v) => !v, false);
    const {header} = useAuth();

    // Limit of the results shown to the user
    const RESULT_LIMIT = 6;

    // Query the api
    async function search(){
        const restaurants = await axios.get(`${process.env.REACT_APP_BASE_URL}/search?query=${query}`, {headers: {Authorization: header}})
        setResults(restaurants.data.sort(() => Math.random() - 0.5))
    }

    // Handle the search form submit
    function handleSubmit(e){
        e.preventDefault()
        search()
    }

    // Search on load
    useEffect(() => {
        void search()
    }, [])

    return <BaseLayout>
        <Header />

        <main className="flex flex-col mt-8 items-center gap-4 w-full">
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm w-full">
                <TextField fullWidth icon={<SearchIcon className="fill-gray-500"/>} placeholder="Search for restaurants" onChange={e => setQuery(e.target.value)} value={query} type="search" />
                <Button variant="secondary" onClick={() => search()}><SearchIcon className="fill-purple-500" /></Button>
            </form>

            <div className="flex flex-wrap justify-center gap-4 max-w-7xl">
                {results.slice(0, showMore ? Number.MAX_SAFE_INTEGER : RESULT_LIMIT).map(r => <RestaurantCard key={r.id} imageSrc="/restaurant.webp" {...r} rating={r.averageRating} />)}
            </div>

            {
                results.length === 0 && "No results"
            }

            <Button variant="text" type="rounded" onClick={toggleShowMore}>{showMore ? "Show less" : "Show more"}</Button>
        </main>
    </BaseLayout>
}