import React, {useContext, useReducer} from "react";

export const ADD_PLACE = 'ADD_PLACE';
export const UPDATE_PLACES = 'UPDATE_PLACES';
export const UPDATE_PLACE = 'UPDATE_PLACE';
export const REMOVE_PLACE = 'REMOVE_PLACE';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_GOOGLE_INSTANCE = 'SET_GOOGLE_INSTANCE';
export const SET_MAP = 'SET_MAP';

export const initialAppContextState = {
    google: null,
    places: [],
    amount: 0,
    isLoggedIn: false,
    loading: true,
    error: null,
    map: null
};

const sortByPlaceId = (p1, p2) => {
    if(p1.details.place_id < p2.details.place_id) { return -1; }
    if(p1.details.place_id > p2.details.place_id) { return 1; }
    return 0;
};

export const appReducer = (state, action) => {
    console.debug('appReducer start', state, action);
    switch (action.type) {
        case SET_MAP:
            return { ...state, map: action.payload };
        case ADD_PLACE:
            return { ...state, places: [action.payload, ...state.places].sort(sortByPlaceId) };
        case UPDATE_PLACES:
            return { ...state, places: [...action.payload].sort(sortByPlaceId) };
        case UPDATE_PLACE:
            const filteredPlaces1 = state.places.filter(p => p.details.place_id !== action.payload.details.place_id);
            return { ...state, places: [...filteredPlaces1, action.payload].sort(sortByPlaceId) };
        case REMOVE_PLACE:
            const filteredPlaces2 = state.places.filter(p => p.details.place_id !== action.payload);
            return { ...state, places: filteredPlaces2 };
        case SET_LOGGED_IN:
            return { ...state, loggedIn: action.payload };
        case SET_LOADING:
            return { ...state, loading: action.payload };
        case SET_ERROR:
            return { ...state, error: action.payload };
        case SET_GOOGLE_INSTANCE:
            return { ...state, google: action.payload };
        default:
            return state;
    }
};


export const defaultDispatch = (action) =>
    initialAppContextState;

export const AppContext = React.createContext([
    initialAppContextState,
    defaultDispatch,
]);

export const AppContextWrapper = ({children, initialState = initialAppContextState}) => (
    <AppContext.Provider value={useReducer(appReducer, initialState)}>
        {children}
    </AppContext.Provider>
);

export const useAppContext = () => useContext(AppContext);
