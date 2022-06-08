import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import { useContext } from "react"
import { AppContext } from "../../AppContext.js"
import { useNavigate } from 'react-router-dom'

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
        <>
        {selectedClinic && (
            <>
            <h1>{selectedClinic.Name}</h1>

            {ratingStar.map(() => {
                return <FontAwesomeIcon key={Math.random()*selectedClinic._id}
                                        icon={faStar} />
            })}
            
            <h2>Comments</h2>
            {selectedClinic.comments && (
                selectedClinic.comments.map((item) => {
                    return (
                        <>
                        <p key={Math.random()*selectedClinic._id}>
                            {item.user}
                        </p>
                        <p key={Math.random()*selectedClinic._id}>
                            {item.msg}
                        </p>
                        </>
                    )
                })
            )}
            <button key={Math.random()*selectedClinic._id}
                    onClick={handleCLick}>
                leave comments
            </button>
            </>
            )}
    
        </>
    )
}
 export default Comments
