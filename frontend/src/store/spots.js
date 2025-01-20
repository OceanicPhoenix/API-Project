import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spot/getAllSpots";
const GET_SINGLE_SPOT = "spot/getSingleSpotDetail"
const UPDATE_SPOT = "spot/update"
const DELETE_SPOT = "spot/deleteSpot";



//Action Creators
const getSpots = (spots) => ({
  type: GET_ALL_SPOTS,
  payload: spots
});

const getSpot = (spot) => ({
  type: GET_SINGLE_SPOT,
  payload: spot
});

const deleteSpot = (id) => ({
   type: DELETE_SPOT,
   payload: id
  });



// Thunk
export const getAllSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  const data = await res.json();

  console.log('check response', data);
  if (data.Spots) {
    dispatch(getSpots(data.Spots))
  }
};

export const getCurrentUserSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current");
  const data = await res.json();
  if (data.Spots) {
    dispatch(getSpots(data.Spots))
  }
}

export const createNewSpotThunk = (spotData, imageData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spotData),
  });
  const newSpot = await response.json();
  if (newSpot) {
    return dispatch(addSpotImage(newSpot, imageData)); //imageData is an array
  }
}
export const addSpotImage = (spot, image) => async (dispatch) => {

  if (image) {
    spot.SpotImages = [];
    for (let i = 0; i < image.length; i++) {
      if (image[i].url) {
        console.log(image[i].url)
        const response = await csrfFetch(`/api/spots/${spot.id}/images`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: image[i].url,
            preview: "true"
          }),
        })
        const newImage = await response.json();
        spot.SpotImages.push(newImage);
        console.log('newImage', newImage)
      }
      console.log('spot.SpotImages', spot.SpotImages)
    }
  }
  dispatch(getSpot(spot));
  return spot.id;
}


export const getSpotDetailThunk = (id) => async (dispatch) => {
  console.log('singular spot', id)
  const res = await csrfFetch(`/api/spots/${id}`);
  const data = await res.json();
  if (data) {
    dispatch(getSpot(data))

  }
}

export const updateSpot =
  (newSpotData, id) => async (dispatch) => {
    console.log('in thunk', newSpotData)  //reach here ok
    try {
      const response = await csrfFetch(`/api/spots/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({
          country: newSpotData.country,
          address: newSpotData.address,
          city: newSpotData.city,
          state: newSpotData.state,
          description: newSpotData.description,
          name: newSpotData.name,
          price: newSpotData.price
        }),
      })
      let updatedSpot = await response.json();
      console.log('updatedSpot', updatedSpot)
      dispatch(getSpot(updatedSpot));
      return updatedSpot;

    } catch (error) {
      console.log('error', error)
    }
  }


export const deleteSpotThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`, { method: "DELETE" });
  if (res.ok) {
    return dispatch(deleteSpot(id));
  }
};


//Reducer
//allSpots []  , spot{} single spot detail
const initialState = { allSpots: [], spot: {} };

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      // console.log('allspots', action.payload)
      return {
        allSpots: action.payload,
        spot: state.spot
      };
    case GET_SINGLE_SPOT:
      return {
        allSpots: state.allSpots,
        spot: action.payload
      }

    case UPDATE_SPOT:
      return {
        allSpots: state.allSpots,
        spot: action.payload
      }

    case DELETE_SPOT:
      return {
        allSpots: state.allSpots.filter((spot) => {
          return spot.id !== action.payload
        }),
        spot: state.spot,
      };


    default:
      return state;
  }
};

export default spotReducer;