import { createContext, useReducer } from "react";

export const AppContext = createContext(null);

const initialState = {
    homePageLoad: false,
    homePageData: null,
    mapPageLoad : false,
    mapPageData: [],
    commentsLoad: false,
    commentsData: [],
}

const reducer = (state, action) => {

    // console.log(action.data)
    switch(action.type) {
        case "get-homepage-data" : {
            return {
                ...state,
                homePageLoad: true,
                homePageData: action.data
            }
        } 
        case "get-filtered-data" : {
            return {
                ...state,
                mapPageLoad: true,
                mapPageData: action.data
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
            ...data
        })
    }


    return (
        <AppContext.Provider value={{ 
            state,
            actions: {
                getHomepageData,
                getfilteredData
            }
        }}>
            {children}
        </AppContext.Provider>
    );
};