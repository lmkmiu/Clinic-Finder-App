import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext.js";
import Map from "../Map/Map"

const HomePage = () => {

// const { actions: {
//     getHomepageData,
//         } } = useContext(AppContext)

//     useEffect(() => {
//         fetch("/api/all-business")
        
//             .then((res) => res.json())
//             .then((data) => { 
//                 getHomepageData(data.data)
//             })
//             .catch((error) => {
//                 console.log("Error", error);
//             });
//     }, []);

    return (
        <>
        <Map />
        </>
    )
}

    export default HomePage