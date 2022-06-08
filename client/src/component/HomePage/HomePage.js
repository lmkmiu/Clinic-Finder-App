import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext.js";
import Map from "../Map/Map"
import {data} from "./data.js"


const HomePage = () => {

const { actions: {
    getHomepageData,
        } } = useContext(AppContext)

    useEffect(() => {
        fetch("/api/all-business")
        
            .then((res) => res.json())
            .then((data) => { 
                console.log(data)
                getHomepageData(data.data)
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }, []);

    // useEffect(() => {
    //     getHomepageData(data)
    // }, [])

    return (
        <>
        <Map />
        </>
    )
}

    export default HomePage