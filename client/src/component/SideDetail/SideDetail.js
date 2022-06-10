import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone, faStar } from '@fortawesome/free-solid-svg-icons'

import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../AppContext';

const SideDetail = () => {
// get selected clinic ID and fetch single clinic from server
    // const id = JSON.parse(window.sessionStorage.getItem("clinicId"))
    // const [ clinic , setClinic ] = useState(null)
    // const [ loaded, setLoaded ] = useState(null)
    const { state: { selectedClinic },
            actions: {  }} = useContext(AppContext)
    const navigate = useNavigate();
    
    // useEffect(() => {
    //     fetch(`/api/business/${id}`)
    //         .then((res) => res.json())
    //         .then((data) => { 
    //             setClinic(data.data)
    //             setLoaded(true)
    //         })
    //         .catch((error) => {
    //             console.log("Error", error);
    //         });
    // }, [id])
    
    //creating an array for rating
    let ratingStar = []
    if (selectedClinic) {
        for (let i = 0; i < selectedClinic.rating; i ++) {
            ratingStar = [...ratingStar, i]
        }
    }

    // save the selected clinic ID to session storage and redirect to clinic detail page
    const handleCLick = () => {
        navigate(`/clinic/${selectedClinic._id}`);
    }

    return (
        <Wrapper >
            {selectedClinic && (
                <>
                <H1>{selectedClinic.Name}</H1>
                <h1>Rating</h1>
                <Stars> 
                    {ratingStar.map(() => {
                        return <FontAwesomeIcon key={10400098760 * selectedClinic._id}
                                            icon={faStar} />
                    })}
                </Stars>
                <Right>
                    <InfoDiv>
                        <FontAwesomeIcon icon={faPhone} /> 
                        <Info>
                            {selectedClinic.phone}
                        </Info>
                    </InfoDiv>
                    <InfoDiv>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <Info>
                            {selectedClinic.location}
                        </Info>
                    </InfoDiv>
                    {selectedClinic.acupuncturist && <CatDiv >
                        <Info>Acupuncturist : </Info>
                        {selectedClinic.acupuncturist.map((item) => {
                            return (
                                <Text  key={1345960 * selectedClinic._id}>
                                    "{item}"
                                </Text>
                            )})}
                    </CatDiv>}
                    {selectedClinic.chiropractor && <CatDiv >
                        <Info>Chiropractor : </Info>
                        {selectedClinic.chiropractor.map((item) => {
                            return (
                                <Text  key={27536 * selectedClinic._id}>
                                    "{item}"
                                </Text>
                            )})}
                    </CatDiv>}
                    {selectedClinic.osteopath && <CatDiv >
                        <Info>Osteopath : </Info>
                        {selectedClinic.osteopath.map((item) => {
                            return (
                                <Text  key={39558990053 * selectedClinic._id}>
                                    "{item}"
                                </Text>
                            )})}
                    </CatDiv>}
                    {selectedClinic.physiotherapist && <CatDiv >
                        <Info>Physiotherapist : </Info>
                        {selectedClinic.physiotherapist.map((item) => {
                            return (
                                <Text  key={4174379636 * selectedClinic._id}>
                                    "{item}"
                                </Text>
                            )})}
                    </CatDiv>}
                </Right>
                <Btn onClick={handleCLick}>
                    Details
                </Btn>
            </>)}
        </Wrapper>
    )
}
const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 25px;
`
const Right = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 25px;
`
const H1 = styled.h1`
    padding: 25px;
    font-size: 30px;
`
const Stars = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 20px;
    margin: 10px;
    border: 4px solid var(--color-glitter);
    border-radius: 5px;
    box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
`
const InfoDiv = styled.div`
    display: flex;
    margin: 25px;
`
const Info = styled.span`
    margin-left: 10px;
`
const CatDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 25px;
`
const Text = styled.span`
    margin-left: 10px;
`
const Btn = styled.button`
    margin: 25px;
    border: none;
    border-radius: 5px;
    background: var(--color-powder-blue);
    text-decoration: none;
    font-size: 15px;
    height: 30px;
    transition: all 300ms ease-in-out;
    cursor: pointer;
    padding: 0 20px;
    &:hover {
        background: var(--color-green-blue);
        color: #fff;
    }
`
    export default SideDetail