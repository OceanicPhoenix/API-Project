import { useState } from "react";
import './StarRating.css';
import { FaStar } from "react-icons/fa";

const StarRating = ({ setStars }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const controlRate = (rating) => {
    setStars(rating);
  };


  return (
    <>

      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          const currentValue = index + 1;
          return (
            <>
              <label>
                <input type='radio'
                  key={star}
                  name='rating'
                  value={currentValue}
                  onClick={() => {
                    setRating(currentValue)
                    controlRate(currentValue)
                  }} />

                <FaStar className='star' size={20} color={currentValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  onMouseEnter={() => {
                    setHover(currentValue)

                  }}
                  onMouseLeave={() => setHover(null)} />
              </label>

            </>
          );
        })}<label className="stars-after-img"> stars</label>
      </div>
    </>
  );
};

export default StarRating;