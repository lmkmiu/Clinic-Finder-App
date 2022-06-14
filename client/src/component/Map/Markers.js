import { InfoWindow, Marker } from "@react-google-maps/api";
import { useContext } from "react";
import { AppContext } from "../../AppContext";

const Markers = () => {
    const { state: { filterData, selectedClinic },
            actions: { selectClinic }} = useContext(AppContext)


    const handleSelect = (place) => {
        selectClinic(place)
        window.sessionStorage.removeItem("clinicId")
        window.sessionStorage.setItem("clinicId", JSON.stringify(place._id));
    }
    return (
        <>
        {filterData?.map(place => (
            
            <Marker key={257199279 * place._id}
                    position={{ lat: place.geolocation.lat, 
                                lng: place.geolocation.lng }}
                    onClick={()=> handleSelect(place)}
                    icon={{ url: "/marker.png",
                            scaledSize: new window.google.maps.Size(30,30)}}
                            animation={window.google.maps.Animation.DROP}
                    />))
                }
            
            {selectedClinic && (
                <InfoWindow position={{ lat: selectedClinic.geolocation.lat, 
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