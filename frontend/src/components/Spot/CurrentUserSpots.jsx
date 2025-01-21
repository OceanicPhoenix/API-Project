import { getCurrentUserSpotsThunk } from "../../store/spots";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CurrentUserSpots.css'
import { useNavigate } from "react-router-dom";
import DeleteSpotModal from '../DeleteSpotModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

function CurrentUserSpots() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let spots = useSelector((state) => state.spots.allSpots);
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





  useEffect(() => {
    dispatch(getCurrentUserSpotsThunk());
  }, [dispatch]);


  if (!spots) return null;


  const handleUpdate = (id) => {
    let path = `/spots/${id}/edit`;
    navigate(path);   
  };
  const handleClicker = (id) => {
    let path = `/spots/${id}`;
    navigate(path);  
  }
  const redirectToCreateForm = () => {
    let path = `/spots/new`;
    navigate(path);  
  }

  return (
    <>
      <div className="header">
        <div className="title">
          <h1>Manage your spots</h1>

          <div className="button-container">
            <button className="create-new-spot-btn" onClick={() => redirectToCreateForm()}>
              Create a New Spot
            </button>
          </div>
        </div>
      </div>
      {spots.length === 0 ?
        (
          <div>
            <h2>You do not have any spots</h2>
          </div>
        )
        :
        (
          <div className="spots-container">

            {spots.length > 0 && spots.map((spot) => {
              return (
                <>
                  <div className="single-spot-container" key={spot.id}>
                    <div className="single-spot-intro">
                      <img
                        className="preview-image"
                        src={spot.previewImage}
                        alt={spot.previewImage}
                        onClick={() => handleClicker(spot.id)}
                      />

                      <div className="location_rating" onClick={() => handleClicker(spot.id)}>
                        <p className="location" onClick={() => handleClicker(spot.id)}>{spot.city}, {spot.state}</p>

                        {!spot.avgRating == null ? (<p className="rating" onClick={() => handleClicker(spot.id)}>★ {spot.avgRating}</p>) : (<p onClick={() => handleClicker(spot.id)}>★ New</p>)}
                      </div>
                      <div className="price" onClick={() => handleClicker(spot.id)}>
                        <p onClick={() => handleClicker(spot.id)}>${spot.price} night</p>
                      </div>
                    </div>
                    <div className="operation">
                      <button className="update-btn" onClick={() => handleUpdate(spot.id)}>
                        Update
                      </button>
                      <div className="delete-button">
                        <p>
                          <OpenModalMenuItem
                            itemText="Delete"
                            onItemClick={closeMenu}
                            modalComponent={<DeleteSpotModal id={spot.id} />}
                          />
                        </p>
                      </div>
                    </div>

                  </div>
                </>
              )

            })}
          </div>
        )
      }
    </>
  )
}
export default CurrentUserSpots;