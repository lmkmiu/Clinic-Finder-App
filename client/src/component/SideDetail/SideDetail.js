import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone, faStar } from '@fortawesome/free-solid-svg-icons'
import { Rating } from 'react-simple-star-rating'

import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../AppContext';

const SideDetail = () => {
    const { state: { selectedClinic },
            actions: {  }} = useContext(AppContext)
    const navigate = useNavigate();

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
                    <Rating initialValue={selectedClinic.rating} 
                    />
                    <Right>
                        <InfoDiv>
                            <FontAwesomeIcon icon={faPhone} /> 
                            <Info> {selectedClinic.phone} </Info>
                        </InfoDiv>
                        <InfoDiv>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <Info> {selectedClinic.location} </Info>
                        </InfoDiv>
                        {selectedClinic.acupuncturist && <CatDiv >
                            <Info>Acupuncturist : </Info>
                            {selectedClinic.acupuncturist.map((item) => {
                                return (
                                    <Text  key={Math.random() * selectedClinic._id}>
                                        "{item}"
                                    </Text>
                                )})}
                        </CatDiv>}
                        {selectedClinic.chiropractor && <CatDiv >
                            <Info>Chiropractor : </Info>
                            {selectedClinic.chiropractor.map((item) => {
                                return (
                                    <Text  key={Math.random() * selectedClinic._id}>
                                        "{item}"
                                    </Text>
                                )})}
                        </CatDiv>}
                        {selectedClinic.osteopath && <CatDiv >
                            <Info>Osteopath : </Info>
                            {selectedClinic.osteopath.map((item) => {
                                return (
                                    <Text  key={Math.random() * selectedClinic._id}>
                                        "{item}"
                                    </Text>
                                )})}
                        </CatDiv>}
                        {selectedClinic.physiotherapist && <CatDiv >
                            <Info>Physiotherapist : </Info>
                            {selectedClinic.physiotherapist.map((item) => {
                                return (
                                    <Text  key={Math.random() * selectedClinic._id}>
                                        "{item}"
                                    </Text>
                                )})}
                        </CatDiv>}
                    </Right>
                    <Btn onClick={handleCLick}>
                        Leave your review
                    </Btn>
                </>)}
        </Wrapper>
    )
}
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
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