import {Button} from "./Button";
import {Rating} from "./Rating";
import {NavLink} from "react-router-dom";

/**
 * Restaurant card react component
 * @param imageSrc
 * @param name
 * @param rating
 * @param visited
 * @param description
 * @param id
 * @returns {JSX.Element}
 * @constructor
 */
export function RestaurantCard({imageSrc, name, rating, visited, description, id}) {
    return <div className={`p-4 pb-2 bg-white rounded-lg shadow-xl flex flex-col gap-2 w-96 h-[450px] ${visited ? 'border border-purple-500' : ''}`}>
        <img src={imageSrc} alt={name} className="w-full rounded-lg shadow-xl object-cover h-56"/>
        <div className="flex items-center justify-between mt-4">
            <h2 className="text-2xl font-bold">{name}</h2>
            <Rating readOnly value={Math.round(rating)} />
        </div>
        <p className="text-gray-600">{description}</p>
        <div className="ml-auto mt-auto -mr-3">
            <NavLink to={`/restaurants/${id}`}>
                <Button type="rounded" variant="text">
                    Continue >>
                </Button>
            </NavLink>
        </div>
    </div>
}