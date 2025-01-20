// import { useState } from "react";
import { useDispatch} from "react-redux";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from '../../store/reviews'
import './DeleteReviewModal.css';



function DeleteReviewModal({ id, spotId }) {
  const dispatch = useDispatch();
//   const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  console.log('now', id, spotId)  //


  const confirmDelete = () => {
    dispatch(deleteReviewThunk(id, spotId));
    closeModal();
  }
  return (
    <>
      <div className="delete-box">
        <h3 className="title">Confirm Delete</h3>
        <h4 className="sub-title">Are you sure you want to delete this review?</h4>
        <div className="button-container">
          <button
            className="Yes-delete-button"
            onClick={confirmDelete}
          >Yes (Delete Review)</button>

          <button
            className="No-delete-button"
            onClick={closeModal}
          >No (Keep Review)</button>
        </div>
      </div>



    </>
  )
}

export default DeleteReviewModal;