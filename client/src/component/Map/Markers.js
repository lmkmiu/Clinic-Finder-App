import styled from "styled-components";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { useState } from "react";

const Markers = () => {
    const [ selected, setSelected ] = useState(null)

    
    return (
        <>
        <Marker key="001"
                position={ {lat: 45.478020, lng: -73.618600} }
                onClick={()=> setSelected("clicked")}
                icon={{ url: "/A.png",
                        scaledSize: new window.google.maps.Size(30,30)}}
                        />
        
        {selected ? (
            <InfoWindow position={{lat: 45.478020, lng: -73.618600}}
                        onCloseClick={()=> setSelected(null)}>
                <div>
                    <p>Clinic name</p>
                </div>
            </InfoWindow>
        ): null}
    </>)
}

export default Markers