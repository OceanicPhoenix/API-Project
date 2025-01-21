import { useEffect } from "react";
import { useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/reviews";
import DeleteReviewModal from '../DeleteReviewModal';
import OpenModalMenuItemForReview from "../OpenModalMenuItemForReview/OpenModalMenuItemForReview"
import './Review.css'

function dateConvert(date) {
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const newDate = new Date(date);
  let y = newDate.getFullYear();
  let m = newDate.getMonth();
  let finalM = month[m];
  return `${finalM} ${y}`
}

function Review() {
  const user = useSelector((state) => state.session.user);
  let { id } = useParams();
  id = parseInt(id)
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const spot = useSelector((state) => state.spots.spot); 
  let unit;

  console.log('spotId!!!!!', id)
  console.log(typeof (id))


  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  if (reviews.length === 1) {
    unit = 'review'
  } else if (reviews.length > 1) {
    unit = 'reviews'
  }



  useEffect(() => {
    dispatch(getReviewsThunk(id));
  }, [dispatch, id]);

  return (
    <>
      {reviews[0] ?
        (<div className="review-container-component">
          <div className="review-container-title">
            {reviews.length > 0 ?
              (<h2>★ {spot.avgStarRating} · {reviews.length} {unit} </h2>) : (<h2>New</h2>)
            }
          </div>
          <div className="review-container-main">
            {reviews.sort((a, b) => {
              const dateA = new Date(a.updatedAt);
              const dateB = new Date(b.updatedAt);
              return dateB - dateA;
            }).map((review) => {
              return (

                <div className="single-review" key={review.id}>

                  <div className="name">
                  <i className="fa-solid fa-circle-user fa-lg"></i>  {review.User.firstName} {review.User.lastName}
                  </div>
                  <div className="date">
                    {dateConvert(review.updatedAt)}
                  </div>
                  
                  <div className="text">
                    <p>{review.review}</p>
                  </div>

                  <div className="delete-review-button">
                    {user && review.userId === user.id &&
                      (<OpenModalMenuItemForReview
                        itemText="Delete"
                        onItemClick={closeMenu}
                        modalComponent={<DeleteReviewModal id={review.id} spotId={id} />}
                      />)}

                  </div>


                </div>
              )
            }
            )}
          </div>

        </div>) : (
          <>
            <h2>★ New</h2>
            {/* <div className="btn-container">{spot.Owner.id !== user.id && <ReviewButton id={id} />}</div> */}
          </>
        )
      }
    </>
  )
}
export default Review;