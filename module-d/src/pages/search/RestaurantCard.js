import {Rating} from "../../components/rating/Rating";
import * as PropTypes from "prop-types";
import {Link} from "react-router-dom";

/**
 * Restaurant card react component
 * @param data
 * @returns {JSX.Element}
 * @constructor
 */
export function RestaurantCard({data}) {
    return <div
        className={`bg-white shadow-xl rounded-md p-4 border group flex flex-col gap-2 min-h-[450px] ${data.visited ? 'border border-purple-400' : ''}`}>
        <img className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:-translate-y-4 transition"
             src="/restaurant.webp" alt={data.name}/>
        <div className="flex justify-between mt-4">
            <h2 className="font-bold text-xl">{data.name}</h2>

            <Rating readOnly value={Math.round(data.averageRating)}/>
        </div>
        <p className="text-gray-600">{data.description}</p>

        <Link to={`/restaurants/${data.id}`} className="mt-auto ml-auto font-bold text-purple-500 transition hover:bg-gray-100 rounded-lg p-2">
            Continue >>
        </Link>
    </div>
}
RestaurantCard.propTypes = {data: PropTypes.any};
