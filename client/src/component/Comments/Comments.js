import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import styled from 'styled-components'
import InputComment from './InputComment.js'
import SingleMap from "../Map/SingleMap.js"
import { useEffect, useState } from 'react'

const Comments = () => {
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
//creating an array for rating
let ratingStar = []
if (clinic) {
    for (let i = 0; i < clinic.rating; i ++) {
        ratingStar = [...ratingStar, i]
    }
}
    return (
        <Wrapper>
        {clinic && (
            <>
                <div>
                    <SingleMap clinic={clinic} /> 
                </div>
                <H1>{clinic.Name}</H1>
            <h1>Rating</h1>
            <Stars> 
                {ratingStar.map(() => {
                    return <FontAwesomeIcon key={10400098760 * clinic._id}
                                            icon={faStar} />
                })}
            </Stars>
            {clinic.comments && <h1>Comments</h1> }
            {clinic.comments && (
                clinic.comments.map((item) => {
                    return (
                        <Comment key={204365567870 *clinic._id}>
                            <p>
                                {item.msg}
                            </p>
                            <User>
                                -- {item.user}
                            </User>
                        </Comment>
                    )
                })
            )}
            
            <InputComment />
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
    padding: 20px;
    margin: 10px;
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
    padding: 20px;
    margin: 10px;
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
