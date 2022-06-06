import styled from "styled-components";
import {    GoogleMap, 
            useJsApiLoader, 
            Marker, 
            InfoWindow } from "@react-google-maps/api";
import mapStyles from "./mapStyles";

// import { formatRelative } from "date-fns";
// const libraries = [ "places" ];

const Map = () => {
    const { isLoaded, loadError 
    } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
        // libraries,
    })

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps"; 

    const mapContainerStyle = {
        width: "700px",
        height: "700px"
    }
    const center = {
        lat : 45.501690,
        lng: -73.567253
    }
    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
    }
    
    return (
        <Div>
            <h1>Clinic Finder</h1>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={11}
                center={center}
                options={options}
            >
                <Marker key="001"
                        position={ {lat: 45.478020, lng: -73.618600} }
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

    export default Map
