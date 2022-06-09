import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'

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
        <Wrapper >
            {loaded ? (
                <>
                <div>
                    <SingleMap clinic={clinic} /> 
                </div>
                <Right>
                    <H1 key={Math.random() * clinic._id}>
                        {clinic.Name}
                    </H1>
                    <InfoDiv>
                        <FontAwesomeIcon icon={faPhone} /> 
                        <Info key={Math.random() * clinic._id}>
                            {clinic.phone}
                        </Info>
                    </InfoDiv>
                    <InfoDiv>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <Info key={Math.random() * clinic._id}>
                            {clinic.location}
                        </Info>
                    </InfoDiv>
                    <CatDiv disabled={clinic.acupuncturist? false : true} >
                        {clinic.acupuncturist && <Info>Acupuncturist : </Info>}
                        {clinic.acupuncturist && (
                        clinic.acupuncturist.map((item) => {
                            return (
                                <Text  key={Math.random() * clinic._id}>
                                    "{item}"
                                </Text>
                            )})
                        )}
                    </CatDiv>
                    <CatDiv disabled={clinic.physiotherapist? false : true}>
                        {clinic.physiotherapist && <Info>Physiotherapist : </Info>}
                        {clinic.physiotherapist && (
                            clinic.physiotherapist.map((item) => {
                                return (
                                    <Text  key={Math.random() * clinic._id}>
                                        "{item}"
                                    </Text>
                                )})
                        )}
                    </CatDiv>
                    <CatDiv disabled={clinic.chiropractor? false : true}>
                        {clinic.chiropractor && <Info>Chiropractor : </Info>}
                        {clinic.chiropractor && (
                        clinic.chiropractor.map((item) => {
                            return (
                                <Text  key={Math.random() * clinic._id}>
                                    "{item}"
                                </Text>
                            )})
                        )}
                    </CatDiv>
                    <CatDiv disabled={clinic.osteopath? false : true}>
                        {clinic.osteopath && <Info>Osteopath : </Info>}
                        {clinic.osteopath && (
                        clinic.osteopath.map((item) => {
                            return (
                                <Text  key={Math.random() * clinic._id}>
                                    "{item}"
                                </Text>
                            )})
                        )}
                    </CatDiv>
                    
                </Right>
            </>): <></>}
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
    export default DetailPage