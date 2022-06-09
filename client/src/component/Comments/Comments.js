import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import { useContext } from "react"
import { AppContext } from "../../AppContext.js"
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Comments = () => {
    const { state: { selectedClinic },
    actions: {  }} = useContext(AppContext)
    const navigate = useNavigate();

//creating an array for rating
let ratingStar = []
if (selectedClinic) {
    for (let i = 0; i < selectedClinic.rating; i ++) {
        ratingStar = [...ratingStar, i]
    }
}
// save the selected clinic ID to session storage and redirect to clinic detail page
const handleCLick = () => {
    window.sessionStorage.setItem("clinicId", selectedClinic._id);
    navigate(`/clinic/${selectedClinic._id}`);
}
    return (
        <Wrapper>
        {selectedClinic && (
            <>
            <H1>{selectedClinic.Name}</H1>
            <h1>Rating</h1>
            <Stars> 
                {ratingStar.map(() => {
                    return <FontAwesomeIcon key={Math.random()*selectedClinic._id}
                                            icon={faStar} />
                })}
            </Stars>
            <h1>Comments</h1>
            {selectedClinic.comments && (
                selectedClinic.comments.map((item) => {
                    return (
                        <Comment>
                            <p key={Math.random()*selectedClinic._id}>
                                {item.msg}
                            </p>
                            <User key={Math.random()*selectedClinic._id}>
                                -- {item.user}
                            </User>
                        </Comment>
                    )
                })
            )}
            <Btn key={Math.random()*selectedClinic._id}
                    onClick={handleCLick}>
                Details
            </Btn>
            </>
            )}
    
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 25px;
`
const H1 = styled.h1`
    padding: 25px;
    font-size: 30px;
`
const Stars = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 25px;
    margin: 25px;
    border: 4px solid var(--color-glitter);
    border-radius: 5px;
    box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
`
const User = styled.p`
    font-size: 15px;
    font-style: italic;
    margin-top: 10px;
`
const Comment = styled.div`
    padding: 25px;
    margin: 25px;
    border: 4px solid var(--color-glitter);
    border-radius: 5px;
    box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
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
    export default Comments
