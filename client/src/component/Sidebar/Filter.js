import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../AppContext.js'

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
    
    return (
        <>
        <label className="container"> 
            <input type="checkbox" value="acupuncturist" onClick={clickHandler}/> 
                Acupuncture
        </label>
        <label className="container"> 
            <input type="checkbox" value="chiropractor" onClick={clickHandler}/> 
                Chiropractic
        </label>
        <label className="container"> 
            <input type="checkbox" value="physiotherapist" onClick={clickHandler}/> 
                Physiotherapy
        </label>
        <label className="container"> 
            <input type="checkbox" value="osteopath" onClick={clickHandler}/> 
                Osteopathy
        </label>
        <p> Rating</p>
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
    
        </>
    )
}
 export default Filter
