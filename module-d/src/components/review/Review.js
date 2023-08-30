import {Rating} from "../rating/Rating";
import * as PropTypes from "prop-types";

/**
 * Review box react component
 * @param data
 * @returns {JSX.Element}
 * @constructor
 */
export function Review({data}) {
    return <div className="border rounded-md p-4 flex flex-col w-full gap-2">
        <div className="flex flex-row justify-between items-center">
            <h3 className="font-bold text-lg">{data.reviews}</h3>

            <Rating value={data.rating} readOnly/>
        </div>
        <hr/>
        <p>{data.comment}</p>
    </div>
}

Review.propTypes = {
    data: PropTypes.any
};