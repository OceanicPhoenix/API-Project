import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import PostReviewModal from '../PostReviewModal';
import OpenModalMenuItemForReview from "../OpenModalMenuItemForReview/OpenModalMenuItemForReview"
import './ReviewButton.css'


function ReviewButton({ id }) {
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.reviews);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  console.log('userId', user.id)
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

  if (reviews[0] !== null) {
    const reviewByCurrentUser = reviews.find((review) => review.userId === user.id)
    if (reviewByCurrentUser) {
      return null;
    }
  }



  let action;
  if (reviews[0] == null) {
    action = 'Be the first to post a review!'
  }



  return (
    <>
      {reviews[0] == null ?
        (<div className="post-review-button">
          <p>
            <OpenModalMenuItemForReview
              itemText="Post your review"
              onItemClick={closeMenu}
              modalComponent={<PostReviewModal id={id} />}
            />
          </p>
          <p>{action}</p>

        </div>) :
        (<div className="post-review-button">
          <p>
            <OpenModalMenuItemForReview
              itemText="Post your review"
              onItemClick={closeMenu}
              modalComponent={<PostReviewModal id={id} />}
            />
          </p>
          <p>{action}</p>

        </div>)
      }
    </>
  )
}

export default ReviewButton;