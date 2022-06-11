import { Rating } from 'react-simple-star-rating'
import FancyLoadingAnimation from 'fancy-loading-animation'
import 'fancy-loading-animation/dist/index.css'

import styled from 'styled-components'
import InputComment from './InputComment.js'
import SingleMap from "../Map/SingleMap.js"
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../AppContext.js'

const Comments = () => {
    // get selected clinic ID and fetch single clinic from server
    const id = JSON.parse(window.sessionStorage.getItem("clinicId"))
    const [ clinic , setClinic ] = useState(null)
    const [ load, setLoad ] = useState(null)
    // const [ratingValue, setRatingValue] = useState(null)
    const { state: {ratingValue} , actions: {setRatingValue} } = useContext(AppContext)

    useEffect(() => {
        fetch(`/api/business/${id}`)
            .then((res) => res.json())
            .then((data) => { 
                setClinic(data.data)
                setLoad(true)
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }, [id])

    const handleRating = (rate) => {
        setRatingValue(rate * 5 / 100)
    }

    
    return (
        <Wrapper>
            {!load ? (
                <Div>
                    <FancyLoadingAnimation
                    loadingAnimationVarient='paper-bird'
                    loadingAnimationDelay={0.2}
                    loadingContainerColor="#E2F0F9"
                    loadingCharacterDirection='left'
                    loadingTextStyle={{ color: "#286fb4" }}
                    />
                </Div>
                ) : (<>
                <SingleMap clinic={clinic} /> 
                <Div>
                    <H1>{clinic.Name}</H1>
                    {clinic.comments && (
                        <CommentsDiv>
                            <H2>Comments</H2>
                            {clinic.comments.map((item) => {
                                return (
                                    <Comment key={204365567870 *clinic._id}>
                                        <p> {item.msg} </p>
                                        <Rating initialValue={item.rating}
                                                fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                                        />
                                        <User> -- {item.user} </User>
                                    </Comment>
                                    )
                                })}
                        </CommentsDiv>) }
                        <CommentsDiv>
                            <H2>Give your rating</H2>
                            <Comment>
                                <Rating onClick={handleRating}
                                ratingValue={ratingValue}
                                fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                                showTooltip
                                tooltipArray={['Terrible', 'Bad', 'Average', 'Great', 'Prefect']}
                                />
                            </Comment>
                        </CommentsDiv>
                    <InputComment />
                </Div>
            </>
        )}
        </Wrapper>
    )
}
const Wrapper = styled.div`
    display: flex;
    margin: 25px;
`
const H1 = styled.h1`
    padding: 10px;
    font-size: 25px;
    align-self: center;
`
const H2 = styled.h2`
    padding: 10px;
    font-size: 20px;
`
const CommentsDiv = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin: 10px 25px;
`
const User = styled.span`
    font-size: 15px;
    font-style: italic;
    margin-top: 10px;
`
const Comment = styled.div`
    padding: 20px;
    margin: 10px 0px;
    width: 100%;
    border: 4px solid var(--color-glitter);
    border-radius: 5px;
    box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
`
const Div = styled.div`
    margin: 25px;
    display: flex;
    flex-direction: column;
`
    export default Comments
