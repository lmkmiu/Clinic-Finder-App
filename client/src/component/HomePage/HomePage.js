import styled from "styled-components"
import Map from "../Map/Map"
import FeedbackShow from "./FeedbackShow"

const HomePage = () => {

    return (
        <Div>
            <Map />
            <FeedbackShow />
        </Div>
    )
}
const Div = styled.div`
    display: flex;
    flex-direction: column;
`
    export default HomePage