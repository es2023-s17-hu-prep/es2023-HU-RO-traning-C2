import {Rating} from "./Rating";
import {TextField} from "./TextField";
import {useState} from "react";
import {Button} from "./Button";

/**
 * Review form react component
 * @param onSubmit
 * @returns {JSX.Element}
 * @constructor
 */
export function ReviewForm({onSubmit}) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [ratingError, setRatingError] = useState(false);
    const [commentError, setCommentError] = useState(false);

    // Handle the form submit
    function handleSubmit(e) {
        e.preventDefault()

        // Validation
        setCommentError(false)
        setRatingError(false)
        if(rating === 0){
            setRatingError(true)
            return;
        }
        if(comment === ""){
            setCommentError(true)
            return;
        }

        // Emit event
        onSubmit({comment, rating})
        setRating(0)
        setComment("")
    }

    return <div className={`p-4 rounded-lg shadow-md border flex flex-col gap-2 w-96`}>
        <p>Have any thoughts? Share it with us! 😊</p>
        <div className="flex gap-2">
            <Rating value={rating} onChange={setRating} />
            {ratingError && <span className="text-red-600 text-sm">You have to give a rating</span>}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
            <TextField fullWidth placeholder="Review" value={comment} onChange={e => setComment(e.target.value)} type="text"/>
            <Button variant="primary" onClick={handleSubmit}>Send</Button>
        </form>
        {commentError && <span className="text-red-600 text-sm">The comment cannot be empty</span>}
    </div>
}