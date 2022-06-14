import styled from "styled-components";
import {    GoogleMap, 
            useJsApiLoader,
            Marker } from "@react-google-maps/api";
import { mapStyles } from "./mapStyles";
import { useCallback, useRef } from "react";
const libraries = [ "places" ];

const SingleMap = ({ clinic }) => {

    const { isLoaded, loadError 
    } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
        libraries
    })
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map
    }, [])

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps"; 

    const mapContainerStyle = {
        height: 400, 
        width: 400, 
        display: 'flex', 
        flexFlow: 'row nowrap', 
        justifyContent: 'center', 
        padding: 0,
        border: "4px solid var(--color-glitter)",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgb(32 33 36 / 28%)"
    }
    const center = {
        lat : clinic?.geolocation.lat,
        lng: clinic?.geolocation.lng
    }
    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
    }
    
    return (
        <Wrapper>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >
                <Marker position={{ lat: clinic.geolocation.lat, 
                                    lng: clinic.geolocation.lng }}
                        animation={window.google.maps.Animation.BOUNCE}
                />
            </GoogleMap>
            
        </Wrapper>
    )
}

const Wrapper = styled.div`
`

    export default SingleMap
