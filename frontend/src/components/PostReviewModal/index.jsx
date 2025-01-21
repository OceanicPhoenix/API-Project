import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import StarRating from "./StarRating";
import {createAReviewThunk} from '../../store/reviews'
// import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './PostReviewModal.css';

function PostReviewModal(spotId) {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const { closeModal } = useModal();


  const userId = user.id;
  useEffect(() => {
    console.log('PostReviewModal review', review)
    console.log('PostReviewModal stars', stars)
    console.log('PostReviewModal spotId', spotId["id"])
    console.log('PostReviewModal userId',userId)
  }, [review, stars]);



  const handleSubmit = async () => {
    let createdReview;
    try {
      createdReview = await dispatch(createAReviewThunk(user, spotId, review, stars)) .then(closeModal)

      // navigate(`/spots/${spotId.id}`);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div className="review-box">
        <h3 className="title">How was your stay?</h3>
        <textarea
          className="review-input"
          placeholder="Leave your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <StarRating stars={stars} setStars={setStars} />

        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={review.length < 10 || stars === 0}
        >Submit your review
        </button>

      </div>
    </>
  )
}

export default PostReviewModal;