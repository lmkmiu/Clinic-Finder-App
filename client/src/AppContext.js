import { createContext, useReducer } from "react";

export const AppContext = createContext(null);

const initialState = {
    homePageData: null,
    filterData: null,
    selectedClinic: null,
    ratingValue: null,
    reload: false
}

const reducer = (state, action) => {

    switch(action.type) {
        case "get-homepage-data" : {
            return {
                ...state,
                homePageData: action.data
            }
        } 
        case "get-filtered-data" : {
            return {
                ...state,
                filterData: action.data
            }
        }
        case "select-clinic" : {
            return {
                ...state,
                selectedClinic: action.data
            }
        }
        case "set-rating-value" : {
            return {
                ...state,
                ratingValue: action.data
            }
        }
        case "set-reload" : {
            return {
                ...state,
                reload: !state.reload
            }
        }
        
        default: 
            throw new Error(`Error`);
    }
}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getHomepageData = (data) => {
        dispatch({
            type: "get-homepage-data",
            data
        })
    }
    const getfilteredData = (data) => {
        dispatch({
            type: "get-filtered-data",
            data
        })
    }
    const selectClinic = (data) => {
        dispatch({
            type: "select-clinic",
            data
        })
    }
    const setRatingValue = (data) => {
        dispatch({
            type: "set-rating-value",
            data
        })
    }
    const setReload = (data) => {
        dispatch({
            type: "set-reload",
            data
        })
    }


    return (
        <AppContext.Provider value={{ 
            state,
            actions: {
                getHomepageData,
                getfilteredData, 
                selectClinic,
                setRatingValue,
                setReload
            }
        }}>
            {children}
        </AppContext.Provider>
    );
};