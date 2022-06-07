import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext.js";

const HomePage = () => {

const { actions: {
    getHomepageData,
        } } = useContext(AppContext)

    useEffect(() => {
        fetch("/api/all-business", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          })
        
            .then((res) => res.json())
            .then((data) => { 
                console.log(data)
                getHomepageData(data.data)
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }, []);

    return (
        <>
        <h1>HomePage</h1>
        </>
    )
}

    export default HomePage