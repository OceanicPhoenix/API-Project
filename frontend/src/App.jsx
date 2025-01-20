import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import Spots from "./components/Spot/Spots";
import CurrentUserSpots from "./components/Spot/CurrentUserSpots";
import NewSpotForm from "./components/Spot/NewSpotForm";
import EditSpotForm from "./components/Spot/EditSpotForm";
import SpotDetail from "./components/Spot/SpotDetail";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Spots />
      },
      {
        path: '/spots/current',
        element: <CurrentUserSpots />
      },
      {
        path: '/spots/new',
        element: <NewSpotForm />
      },
      {path: '/spots/:id/edit',
        element: <EditSpotForm />
      },
      {
        path: '/spots/:id',
        element: <SpotDetail/>
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;