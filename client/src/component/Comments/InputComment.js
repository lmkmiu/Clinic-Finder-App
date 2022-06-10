import { useState } from "react";
import styled from "styled-components";

const InputComment = () => {

const [state, setState] = useState({});
const [userInput, setUserInput] = useState("");
const [char, setChar] = useState();
const userId = window.sessionStorage.getItem("userId")
const clinicId = parseInt(window.sessionStorage.getItem("clinicId"))

    const handleSubmit = (e) => {
        e.preventDefault();
        //pass the userId for matching the username and update the correct user db
        fetch(`/api/post-comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            //send req.body to the db to update the business comments
            body: JSON.stringify({userId, clinicId, userInput}) 
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setState(data);
            })
        //set the input area back to empty
        setUserInput("")
    }

    // show live words limit
    const handleOnChange = (e) => {
        setUserInput(e.target.value)
        const charLeft = 280 - e.target.value.length
        setChar(charLeft)
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputDiv>
                <Input  value={userInput} 
                        type="text" 
                        rows="5" 
                        placeholder="Something to say about this clinic?"
                        onChange={handleOnChange}
                />
                <Char   style={char > 55 ? {color: 'gray'} : (char > 0 ? {color: 'yellow'} : {color: 'red'}) }>
                    {char}
                </Char>
                <SubmitBtn  type="submit" 
                            disabled={char<0}> 
                    Submit 
                </SubmitBtn>
            </InputDiv>
        </form>
        
    )
}
const InputDiv = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    padding: 20px;
    margin: 25px;
    border: 4px solid var(--color-glitter);
    border-radius: 5px;
    box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
`
const Input = styled.textarea`
    width: 70%;
    border: none;
    overflow: auto;
    outline: none;
`
const Char = styled.p`
    margin: 10px;
`
const SubmitBtn = styled.button`
    padding: 10px 25px;
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


export default InputComment