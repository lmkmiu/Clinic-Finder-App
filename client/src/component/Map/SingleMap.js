import styled from "styled-components";
import {    GoogleMap, 
            useJsApiLoader,
            Marker } from "@react-google-maps/api";
import { mapStyles } from "./mapStyles";

const SingleMap = ({clinic}) => {

    const { isLoaded, loadError 
    } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
    })

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps"; 

    const mapContainerStyle = {
        width: "400px",
        height: "400px"
    }
    const center = {
        lat : clinic.geolocation.lat,
        lng: clinic.geolocation.lng
    }
    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
    }
    
    return (
        <Div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={center}
                options={options}
            >
            <Marker key={clinic._id}
                    position={{ lat: clinic.geolocation.lat, 
                                lng: clinic.geolocation.lng }}
                    animation={window.google.maps.Animation.DROP}
            />
            </GoogleMap>
            
        </Div>
    )
}

const Div = styled.div`
    margin: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

    export default SingleMap
