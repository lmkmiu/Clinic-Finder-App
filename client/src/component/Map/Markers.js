import styled from "styled-components";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { useContext, useState } from "react";
import { AppContext } from "../../AppContext";

const Markers = () => {
    const [ selected, setSelected ] = useState(null)
    const { state: { homePageLoad, homePageData }} = useContext(AppContext)
    
    return (
        <>
        {homePageLoad ? (
            homePageData.map((place)=> {
            return(
                <>
            <Marker key={place._id}
                    position={ {lat: place.geolocation.lat, 
                                lng: place.geolocation.lng }}
                    onClick={()=> setSelected("clicked")}
                    icon={{ url: "/marker.png",
                            scaledSize: new window.google.maps.Size(30,30)}}
                    animation={window.google.maps.Animation.DROP}
                            />
            
            {selected ? (
                <InfoWindow position={{ lat: place.geolocation.lat, 
                                        lng: place.geolocation.lng }}
                            onCloseClick={()=> setSelected(null)}>
                    <div>
                        <p>{place.Name}</p>
                        <p>{place.phone}</p>
                    </div>
                </InfoWindow>
            ): null}
            </>)
        })
        ): <h1>loading</h1>
    }
    </>)
}

export default Markers