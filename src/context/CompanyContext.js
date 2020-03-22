import React, {useContext, useReducer} from "react";

export const SET_CODE = 'SET_CODE';
export const SET_PLACE = 'SET_PLACE';

export const initialCompanyContextState = {
    invitationCode: null,
    place:null
};

export const companyReducer = (state, action) => {
    console.debug('companyReducer', state, action);
    switch (action.type) {
        case SET_CODE:
            return {...state, invitationCode: action.payload}
        case SET_PLACE:
            return {...state, place: action.payload}
        default:
            return state;
    }
};


export const defaultDispatch = () =>
    initialCompanyContextState;

export const CompanyContext = React.createContext([
    initialCompanyContextState,
    defaultDispatch,
]);

export const CompanyContextWrapper = ({children, initialState = initialCompanyContextState}) => (
    <CompanyContext.Provider value={useReducer(companyReducer, initialState)}>
        {children}
    </CompanyContext.Provider>
);

export const useCompanyContext = () => useContext(CompanyContext);
