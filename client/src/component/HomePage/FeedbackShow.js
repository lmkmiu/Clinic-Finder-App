import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Rating } from 'react-simple-star-rating'
import { useContext, useEffect } from 'react';
import { AppContext } from '../../AppContext';
import styled from 'styled-components';

const FeedbackShow = () => {

const { state: { homePageData },
        actions: { getHomepageData } } = useContext(AppContext)

    useEffect(() => {
        fetch("/api/all-business")
        
            .then((res) => res.json())
            .then((data) => { 
                getHomepageData(data.data)
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }, []);

    // get all comments from all business
    let commentArray = []
    {homePageData?.forEach((item) => {
            if (item.comments !== null) {
                commentArray = commentArray.concat(item.comments)
            }
        })
    }

    return (
        <Div>
            <Carousel showArrows={true} showThumbs={false}> 
                {commentArray?.map((feedback)=> {
                    return (
                        <Comment key={feedback.id}>
                            <p> {feedback.msg} </p>
                            <Rating initialValue={feedback.rating}
                                    fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                            />
                            <User> -- {feedback.user} </User>
                        </Comment>
                        )
                    })
                }
            </Carousel>
        </Div>
    )
}
const Div = styled.div`
    padding: 0px 25px;
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
export default FeedbackShow