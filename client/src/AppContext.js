import { createContext, useReducer } from "react";

export const AppContext = createContext(null);

const initialState = {
    homePageLoad: null,
    homePageData: null,
    filterLoad : null,
    filterData: null,
    selectedClinic: null,
    commentsLoad: false,
    commentsData: [],
    ratingValue: null,
}

const reducer = (state, action) => {

    // console.log(action.data)
    switch(action.type) {
        case "get-homepage-data" : {
            return {
                ...state,
                homePageLoad: "HomeLoaded",
                homePageData: action.data
            }
        } 
        case "get-filtered-data" : {
            return {
                ...state,
                filterLoad: "filterLoad",
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


    return (
        <AppContext.Provider value={{ 
            state,
            actions: {
                getHomepageData,
                getfilteredData, 
                selectClinic,
                setRatingValue
            }
        }}>
            {children}
        </AppContext.Provider>
    );
};