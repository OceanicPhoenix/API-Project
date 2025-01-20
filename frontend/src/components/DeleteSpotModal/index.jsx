// import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from '../../store/spots'
import './DeleteSpotModal.css';

function DeleteSpotModal(spotId) {
  const dispatch = useDispatch();
//   const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  console.log('now', spotId.id)


  const confirmDelete = () => {
    dispatch(deleteSpotThunk(spotId.id));
    closeModal();
  }
  return (
    <>
      <div id="delete-box">
        <div className>
          <h3 className="title">Confirm Delete</h3>
          <h4 className="sub-title">Are you sure you want to remove this spot from the listings?</h4>
        </div>
        <div className="button-container">
          <button
            className="Yes-delete-button"
            onClick={confirmDelete}
          >Yes (Delete Spot)</button>

          <button
            className="No-delete-button"
            onClick={closeModal}
          >No (Keep Spot)</button>
        </div>
      </div>



    </>
  )
}

export default DeleteSpotModal;