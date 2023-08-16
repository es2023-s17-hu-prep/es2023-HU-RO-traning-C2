import {Rating} from "./Rating";

/**
 * Review react component
 * @param reviewer
 * @param rating
 * @param description
 * @returns {JSX.Element}
 * @constructor
 */
export function Review({reviewer, rating, comment}) {
    return <div className={`p-4 rounded-lg shadow-md border flex flex-col gap-2 w-96`}>
        <div className="flex justify-between">
            <h2 className="text-xl font-bold">{reviewer}</h2>
            <Rating value={Math.round(rating)} readOnly />
        </div>

        <hr/>

        <p>{comment}</p>
    </div>
}