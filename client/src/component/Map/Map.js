import styled from "styled-components";
import {    GoogleMap, 
            useLoadScript, 
            Marker, 
            InfoWindow } from "@react-google-maps/api";
import mapStyles from "./mapStyles";
// import { formatRelative } from "date-fns";
// const libraries = [ "places" ];

const Map = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
        // libraries,
      })
    
      if (loadError) return "Error loading maps";
      if (!isLoaded) return "Loading Maps"; 

    const mapContainerStyle = {
        width: '100vw',
        height: "100vh"
    }
    const center = {
        lat : 45.501690,
        lng: -73.567253
    }
    const options = {
        styles: mapStyles,
        disableDefaultUT: true,
        zoomControl: true,
    }
    
    return (
        <Div>
            <h1>Clinic Finder</h1>
            <GoogleMap
                mapContainerStyle={
                    mapContainerStyle}
                zoom={11}
                center={center}
                options={options}
            >

                </GoogleMap>
        </Div>
    )
}

const Div = styled.div`
    width: 100vw;
    height: 100vh;
`

    export default Map
