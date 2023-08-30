import axios from "axios";
import React, { useState } from "react";
import mail from "../../assets/mail.png";
import { useDineEaseContext } from "../../context/DineEaseContext";
import Rating from "../Rating";
import RatingSelect from "../RatingSelect";
import Button from "../ui/Button";
import Input from "../ui/Input";

/**
 * Displays a list of the menu items
 */
const Reviews = ({ reviews, restaurantId }) => {
  const { token } = useDineEaseContext();

  /**
   * Form values
   */
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");

  /**
   * Handle the review submit
   */
  function handleSubmit(e) {
    e.preventDefault();

    // post the data
    axios
      .post(
        `/restaurant/${restaurantId}/review`,
        { comment: review, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => window.location.reload());
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <h2 className="text-2xl text-slate-800 font-bold">Reviews</h2>

      {reviews.length < 1 && <div>No items found</div>}

      {reviews.map((review) => (
        <div
          key={review.review_id}
          className="flex flex-col gap-2 border border-slate-200 rounded-md shadow-md p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-2xl">{review.reviewer}</h3>
            <Rating rating={review.rating} />
          </div>

          <div className="w-full h-[1px] bg-slate-300" />

          <p className="text-slate-700">{review.comment}</p>
        </div>
      ))}

      <div className="flex flex-col gap-2 border border-primary-light rounded-md p-4 shadow-primary">
        <p className="text-slate-700">
          Have any thoughts? Share it with us! 😉
        </p>

        <RatingSelect value={rating} onChange={setRating} />

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 w-full"
        >
          <Input
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Review"
            icon={<img src={mail} alt="Mail Icon" />}
          />
          <Button fullWidth={false}>Send</Button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
