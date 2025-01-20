import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSpotDetailThunk } from "../../store/spots";
import { updateSpot } from "../../store/spots";
import "./EditSpotForm.css"


function EditSpotForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spots.spot);
//   const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSpotDetailThunk(id));
  }, [dispatch, id]);

  //run after first render
  useEffect(() => {
    console.log('here')
    setCountry(spot.country)
    setAddress(spot.address)
    setCity(spot.city)
    setState(spot.state)
    setDescription(spot.description)
    setName(spot.name)
    setPrice(spot.price)
  }, [spot])


  // const [country, setCountry] = useState(spot.country);
  // const [address, setAddress] = useState(spot.address);
  // const [city, setCity] = useState(spot.city);
  // const [state, setState] = useState(spot.state);
  // const [description, setDescription] = useState(spot.description);
  // const [name, setName] = useState(spot.name);
  // const [price, setPrice] = useState(spot.price);
  // const [errors, setErrors] = useState([]);

  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState([]);




  useEffect(() => {
    const errorsArray = [];
    if (!country) {
      errorsArray.push("Country is required")
    }
    if (!state) {
      errorsArray.push("State is required")
    }
    if (!city) {
      errorsArray.push("City is required")
    }
    if (!address) {
      errorsArray.push("Street address is required")
    }
    // if (description.length < 30) {
    //   errorsArray.push("Description needs a minimum of 30 characters")
    // }
    if (!name) {
      errorsArray.push("Name is required");
    }
    if (!price) {
      errorsArray.push("Price is required");
    }

    setErrors(errorsArray);
  }, [country, address, city, state, description, name, price])


  //***
  // if (!spot.SpotImages) {
  //   return null;
  // }
  if (!spot) return null;
  if (!spot.Owner) return null;



  const handleSubmit = async (e) => {
    e.preventDefault();
    let newSpot = {
      country: country,
      address: address,
      city: city,
      state: state,
      description: description,
      name: name,
      price: price,
      // id: id
    }
    await dispatch(updateSpot(newSpot, id));
    navigate(`/spots/${spot.id}`)

  }


  return (
    <>
      <div className="form-container">
        <form className='new-spot' onSubmit={handleSubmit}>
          <h2>Update your Spot</h2>
          <h3>Where's your place located?</h3>
          <h4>Guests will only get your exact address once they booked a reservation.page</h4>
          <label>
            Country
            <input type='text'
              name='country'
              value={country}
              onChange={(e) => setCountry(e.target.value)} />
          </label>
          <p className='errors'>{errors.filter((validation) =>
            validation.includes("Country"))}</p>
          <label>
            Street address
            <input type='text'
              name='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <p className='errors'>{errors.filter((validation) =>
            validation.includes("address"))}</p>
          <div className="city-state">
            <label className="city">
              City
              <input type='text'
                name='city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
            {/* <p className='errors'>{errors.filter((validation) =>
              validation.includes("City"))}</p> */}
            <label className="state">
              State
              <input type='text'
                name='state'
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </label>
            {/* <p className='errors'>{errors.filter((validation) =>
              validation.includes("State"))}</p> */}
          </div>
          <label className="state-city-errors">
            <span className='errors-city'>{errors.filter((validation) =>
              validation.includes("City"))}</span>
            <span className='errors-state'>{errors.filter((validation) =>
              validation.includes("State"))}</span>
          </label>
          <h3>Describe your place to guests</h3>
          <h4>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h4>
          <textarea
            id='description'
            name='description'
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
          <p className='errors'>{errors.filter((validation) =>
            validation.includes("Description"))}</p>
          <h3>Create a title for your spot</h3>
          <h4>Catch guests' attention with a spot title that highlights what makes your place special.</h4>
          <label>
            <input type='text'
              name='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <p className='errors'>{errors.filter((validation) =>
            validation.includes("Name"))}</p>


          <h3>Set a base price for your spot</h3>
          <h4>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
          <label className="price">
            <div className="money-sign">
              $
            </div>
            <input type='text'
              name='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="money-number"
            />
          </label>
          <p className='errors'>{errors.filter((validation) =>
            validation.includes("Price"))}</p>

          <button
            className="update-button"
            type="submit"
            disabled={errors.length > 0}
          >
            Update your Spot
          </button>

        </form>
      </div >
    </>
  )
}
export default EditSpotForm;