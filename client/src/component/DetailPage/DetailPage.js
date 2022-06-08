import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyringe } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";
import { useEffect, useState } from "react";
import SingleMap from "../Map/SingleMap.js"

const DetailPage = () => {
// get selected clinic ID and fetch single clinic from server
    const id = JSON.parse(window.sessionStorage.getItem("clinicId"))
    const [ clinic , setClinic ] = useState(null)
    const [ loaded, setLoaded ] = useState(null)
    
    useEffect(() => {
        fetch(`/api/business/${id}`)
            .then((res) => res.json())
            .then((data) => { 
                setClinic(data.data)
                setLoaded(true)
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }, [id])
    
    return (
        <Div >
            {loaded ? (
                <>
                <Left>
                    <SingleMap clinic={clinic} /> 
                </Left>
                <Right>
                    <h1 key={Math.random() * clinic._id}>
                        {clinic.Name}
                    </h1>
                    <h2 key={Math.random() * clinic._id}>
                        {clinic.phone}
                    </h2>
                    <p key={Math.random() * clinic._id}>
                        {clinic.location}
                    </p>
                    {clinic.acupuncturist && (
                        clinic.acupuncturist.map((item) => {
                            return (<>
                                <FontAwesomeIcon    key={Math.random() * clinic._id}
                                                    icon={faSyringe} />
                                <p  key={Math.random() * clinic._id}>
                                    {item}
                                </p>
                            </>)
                        })
                    )}
                </Right>
            
            </>): <></>}
        </Div>
    )
}
const Div = styled.div`
    display: flex;
`
const Left = styled.div`
    
`
const Right = styled.div`
    
`

 export default DetailPage