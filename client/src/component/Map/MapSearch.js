import usePlacesAutocomplese, {
    getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox,
        ComboboxInput, 
        ComboboxPopover,
        ComboboxList,
        ComboboxOption, } from "@reach/combobox";
import "@reach/combobox/styles.css"
import styled from "styled-components";
import { useCallback, useRef } from "react";


const MapSearch = ( {panTo} ) => {
    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplese({
        requestOptions: {
            location: { lat : () => 45.5136221588719,
                        lng: () => -73.68259600519754},
            radius: 100 * 1000,
        }
    })

    return (
        <Div>
            <Combobox onSelect={ async(address) => {
                try {
                    const results = await getGeocode({address});
                    const { lat, lng } = await getLatLng(results[0]);
                    panTo({ lat, lng });
                } catch (error) {
                    console.log("error")
                }

            }}>
                <ComboboxInput  value={value}
                                onChange={(e) => {setValue(e.target.value)}} 
                                disabled= {!ready} 
                                placeholder="Enter an address"  
                                style={{padding: "10px 40px", 
                                        margin: "10px 0px",
                                        border: "4px solid #b0dde4",
                                        backgroundColor: "#FFF",
                                        borderRadius: "5px",
                                        boxShadow: "0 4px 6px rgb(32 33 36 / 28%)"}} />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ place_id, description }) => (
                                <ComboboxOption key={place_id} value={description} />
                                ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </Div>
    )
}

const Div = styled.div`
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 300px;
    z-index: 10;
`
export default MapSearch