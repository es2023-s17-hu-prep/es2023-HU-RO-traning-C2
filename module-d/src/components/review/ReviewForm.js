import {Rating} from "../rating/Rating";
import * as PropTypes from "prop-types";
import {TextField} from "../form/TextField";
import {Button} from "../buttons/Button";
import {useState} from "react";

/**
 * Review box react component
 * @param data
 * @returns {JSX.Element}
 * @constructor
 */
export function ReviewForm({onSubmit}) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [ratingError, setRatingError] = useState(false);
    const [commentError, setCommentError] = useState(false);

    function handleSubmit(e){
        e.preventDefault();
        setCommentError(false)
        setRatingError(false)

        if(rating === 0){
            setRatingError(true)
        }

        if(comment === ""){
            setCommentError(true)
        }

        if(comment && rating) {
            onSubmit({comment, rating})
            setRating(0)
            setComment('')
        }
    }

    return <form onSubmit={handleSubmit} className="border rounded-md p-4 flex flex-col w-full gap-3 shadow-lg shadow-purple-300">
        <p>Have any thoughts? Share it with us! 😊</p>
        <Rating value={rating} onChange={setRating} />
        {ratingError && <span className="font-bold text-red-700">You have to give a star rating between 1 and 5</span>}
        <div className="flex gap-2 mt-2">
            <TextField value={comment} onChange={setComment} placeholder="Review" />
            <Button variant="primary" type="submit">Send</Button>
        </div>
        {commentError && <span className="font-bold text-red-700">You have to leave a comment</span>}
    </form>
}

ReviewForm.propTypes = {
    onSubmit: PropTypes.func
};