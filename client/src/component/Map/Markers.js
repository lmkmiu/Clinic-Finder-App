import styled from "styled-components";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { useContext, useState } from "react";
import { AppContext } from "../../AppContext";

const Markers = () => {
    const { state: { homePageLoad, homePageData, filterLoad, filterData, selectedClinic },
            actions: { selectClinic }} = useContext(AppContext)

    return (
        <>
        {filterLoad ? (
            filterData.map(place => (
            
            <Marker key={place._id}
                    position={{ lat: place.geolocation.lat, 
                                lng: place.geolocation.lng }}
                    onClick={()=> selectClinic(place)}
                    icon={{ url: "/marker.png",
                            scaledSize: new window.google.maps.Size(30,30)}}
                    animation={window.google.maps.Animation.DROP}
                            />))): <h1>loading</h1>}
            
            {selectedClinic && (
                <InfoWindow key={Math.random() * selectedClinic._id}
                            position={{ lat: selectedClinic.geolocation.lat, 
                                        lng: selectedClinic.geolocation.lng }}
                            onCloseClick={()=> selectClinic(null)}
                            >
                    <div>
                        <p>{selectedClinic.Name}</p>
                    </div>
                </InfoWindow>
            )}
        
    </>)
}

export default Markers