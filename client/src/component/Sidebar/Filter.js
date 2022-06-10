import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../AppContext.js'
import styled from 'styled-components'

const Filter = () => {
    const { actions: { getfilteredData }} = useContext(AppContext)
    const [ checkbox, setCheckbox ] = useState ( {
        "acupuncturist":false, "chiropractor":false, "physiotherapist":false, "osteopath":false,
        "oneStar":false, "twoStars":false, "threeStars":false, "fourStarts":false, "fiveStars":false
    })
    const [ clickUpdate, setClickUpdate ] = useState(true)

    // convert checkbox into array of keys
    const filtered = Object.entries(checkbox).filter((item)=> {
                            if (item[1] === true)
                        return item[0]
                    }).map((item)=> item[0])

    // separate category and rating for different fetching query values
    const cat = filtered.filter((item) => {
        return item === "acupuncturist" || item === "chiropractor" || item === "physiotherapist" || item === "osteopath"
    })
    const rating = filtered.filter((item) => {
        return item === "oneStar" || item === "twoStars" || item === "threeStars" || item === "fourStars" || item === "fiveStars"
    })

    // fetch data every time checkbox is selected or unselected
    useEffect(() => {
        fetch(`/api/business?cat=${JSON.stringify(cat)}&rating=${JSON.stringify(rating)}`) //
            .then((res) => res.json())
            .then((data) => {
                getfilteredData(data.data);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }, [clickUpdate]);

    // update the checkbox value to useState
    const clickHandler = (e) => {
        setCheckbox({...checkbox, [e.target.value]:!checkbox[e.target.value]})
        setClickUpdate(!clickUpdate)
    } 
    // rest button reset checkbox to default
    const resetHandler = () => {
        setCheckbox({
            "acupuncturist":false, "chiropractor":false, "physiotherapist":false, "osteopath":false,
            "oneStar":false, "twoStars":false, "threeStars":false, "fourStarts":false, "fiveStars":false
        })
        setClickUpdate(!clickUpdate)
    }
    return (
        <form>
            <Div>
                <h3>Category</h3>
                <label className="container"> 
                    <input type="checkbox" value="acupuncturist" onClick={clickHandler}/> 
                        Acupuncture
                </label>
                <label className="container"> 
                    <input type="checkbox" value="chiropractor" onClick={clickHandler}/> 
                        Chiropractic
                </label>
                <label className="container"> 
                    <input type="checkbox" value="osteopath" onClick={clickHandler}/> 
                        Osteopathy
                </label>
                <label className="container"> 
                    <input type="checkbox" value="physiotherapist" onClick={clickHandler}/> 
                        Physiotherapy
                </label>
            </Div>
        
            <Div>
                <h3>Rating</h3>
                <label className="container"> 
                    <input type="checkbox" value="oneStar" onClick={clickHandler}/> 
                        <FontAwesomeIcon icon={faStar} />
                </label>
                <label className="container"> 
                    <input type="checkbox" value="twoStars" onClick={clickHandler}/>   
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                </label>
                <label className="container"> 
                    <input type="checkbox" value="threeStars" onClick={clickHandler}/>   
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                </label>
                <label className="container"> 
                    <input type="checkbox" value="fourStars" onClick={clickHandler}/>   
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                </label>
                <label className="container"> 
                    <input type="checkbox" value="fiveStars" onClick={clickHandler}/>   
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                </label>
            </Div>
            <ResetBtn   type="button"
                        onClick={resetHandler} 
                        value="Reset form">
                Reset
            </ResetBtn>
        </form>
    )
}
const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    margin: 25px;
	background: none;
	border: none;
	position: relative;
    color: var(--color-green-blue);
    border: 2px solid var(--color-green-blue);
`
const ResetBtn = styled.button`
    padding: 10px 20px;
	background: none;
	border: none;
	position: relative;
	text-transform: uppercase;
	font-weight: bold;
    color: var(--color-green-blue);
	letter-spacing: 3px;
	cursor: pointer;
	&:after, &:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		border: 2px solid var(--color-green-blue);
		transition: transform .2s ;
    }
	&:after {
		transform: translate(3px, 3px)	
    }
	&:before {
		transform: translate(-3px, -3px)
    }
	&:hover {
		&:after, &:before {
			transform: translate(0)
        }
    }
`
 export default Filter
