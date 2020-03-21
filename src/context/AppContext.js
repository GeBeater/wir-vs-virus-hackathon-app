import React, {useContext, useReducer} from "react";

export const ADD_PLACE = 'ADD_PLACE';
export const ADD_PLACE_ID = 'ADD_PLACE_ID';
export const REMOVE_PLACE = 'REMOVE_PLACE';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_GOOGLE_INSTANCE = 'SET_GOOGLE_INSTANCE';
export const SET_MAP = 'SET_MAP';

export const initialAppContextState = {
    google: null,
    places: [],
    isLoggedIn: false,
    loading: true,
    error: null,
    map: null
};

export const appReducer = (state, action) => {
    console.log('appReducer', state, action);
    switch (action.type) {
        case ADD_PLACE:
            // todo prevent duplicates
            return { ...state, places: [...state.places, action.payload] };
        case SET_MAP:
            return { ...state, map: action.payload };;
        case REMOVE_PLACE:
            let newPlaces = state.places.slice();
            const index = newPlaces.indexOf(action.payload);
            if (index > -1) {
                newPlaces.splice(index, 1);
            }
            return { ...state, selectedPlaces: newPlaces };
        case SET_LOGGED_IN:
            return { ...state, loggedIn: action.payload };
        case SET_LOADING:
            return { ...state, loading: true };
        case SET_ERROR:
            return { ...state, error: action.payload };
        case SET_GOOGLE_INSTANCE:
            return { ...state, google: action.payload };
        default:
            return state;
    }
};


export const defaultDispatch = () =>
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
