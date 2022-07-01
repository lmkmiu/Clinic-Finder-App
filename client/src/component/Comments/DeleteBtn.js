import { useEffect, useState } from "react";

const DeleteBtn = ( {commentId} ) => {
    const [ role, setRole ] = useState(null)

    const id = window.sessionStorage.getItem("userId")
    // get user name from sessionStorage and db
    useEffect(() => {
        if(id){
            fetch(`/api/user/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setRole(data.data.role)
            })
        .catch((err) => { console.log(err)})
        }
    }, [id]);

    const handleDelete = () => {
        
    }

    return (
        <>
            <button onClick={handleDelete}>delete</button>
        </>
    )
}

export default DeleteBtn