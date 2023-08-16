import axios from "axios";
import React, { useState } from "react";
import mailIcon from "../assets/mail.png";
import { useDineEaseContext } from "../context/DineEaseContext";
import Button from "./Button";
import Input from "./Input";
import StarSelector from "./StarSelector";

/**
 * Component for creating a new review
 */
const NewReview = ({ id, onCreate }) => {
  const { user } = useDineEaseContext();

  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");

  /**
   * Submitting the review
   */
  const submitReview = () => {
    axios
      .post(
        `/restaurant/${id}/reviews`,
        { rating: stars, comment },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then(() => {
        onCreate({ comment, rating: stars, reviewer: user.name });
        setComment("");
        setStars(5);
      });
  };

  return (
    <div className="border border-purple-normal rounded-md p-4 flex flex-col gap-2 [box-shadow:0_2px_4px_#7c3aed55]">
      <div>Have any thoughts? Share it with us! 😁</div>

      <StarSelector stars={stars} onChange={(s) => setStars(s)} />

      <div className="flex gap-2 items-stretch justify-stretch">
        <div className="w-full">
          <Input
            leftIcon={<img src={mailIcon} alt="Icon" />}
            placeholder="Review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div>
          <Button onClick={submitReview}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default NewReview;
