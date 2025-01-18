import { csrfFetch } from './csrf';

// Action Types
const SET_SESSION_USER = 'session/setSessionUser';
const REMOVE_SESSION_USER = 'session/removeSessionUser';

// Action Creators
const setSessionUser = (user) => ({
    type: SET_SESSION_USER,
    user,
});

const removeSessionUser = () => ({
    type: REMOVE_SESSION_USER,
});

// Thunk Action
export const login = (credential, password) => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ credential, password }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setSessionUser(data.user));
    }
};

// Reducer
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SESSION_USER:
            return { ...state, user: action.user };
        case REMOVE_SESSION_USER:
            return { ...state, user: null };
        default:
            return state;
    }
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };
  
export default sessionReducer;