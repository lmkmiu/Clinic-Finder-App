import styled from "styled-components";
import {    GoogleMap, 
            useJsApiLoader } from "@react-google-maps/api";
import { mapStyles } from "./mapStyles";
import Markers from "./Markers";
import SideDetail from "../SideDetail/SideDetail";
import MapSearch from "./MapSearch";
import { useCallback, useRef } from "react";

// import { formatRelative } from "date-fns";
const libraries = [ "places" ];

const Map = () => {
    const { isLoaded, loadError 
    } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
        libraries
    })
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map
    }, [])

    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    }, [])

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps"; 

    const mapContainerStyle = {
        height: 500, 
        width: '100%', 
        display: 'flex', 
        flexFlow: 'row nowrap', 
        justifyContent: 'center', 
        padding: 0,
        border: "4px solid var(--color-glitter)",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgb(32 33 36 / 28%)"
    }
    const center = {
        lat : 45.5136221588719,
        lng: -73.68259600519754
    }
    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
    }
    
    return (
        <Div>
            <Left>
                <H1>Clinic Finder</H1>
                <MapSearch panTo={panTo} />
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={11}
                    center={center}
                    options={options}
                    onLoad={onMapLoad}
                >
                    <Markers />
                </GoogleMap>
            </Left>
        
            <SideDetail />
        </Div>)
}
const Div = styled.div`
    display: flex;
`
const Left = styled.div`
    padding: 25px;
    width: 70%;
    margin-left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const H1 = styled.h1`
    padding: 25px;
    font-size: 30px;
    color: var(--color-green-blue);
`
    export default Map
