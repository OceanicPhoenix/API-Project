import { useState, useEffect, useRef} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
// import CurrentUserSpots from '../Spot/CurrentUserSpots';

function ProfileButton({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

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

  const spots = (e) => {
    e.preventDefault();
    setShowMenu(false);
    navigate('/spots/current');
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      <ul hidden={!showMenu ? "hidden" : null } className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.username}.</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={spots}>Manage Spots</button>
              </li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
            
          </>
        ) : (
          <>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
            </li>
            
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;