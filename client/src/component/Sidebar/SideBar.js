import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom"; 

import Filter from "./Filter";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Authentication/UserContext";


const SideBar = () => {
    const { isLoggedin, setIsLoggedin, currentUser, setCurrentUser } = useContext(UserContext);

    const navigate = useNavigate(); // react-router-dom 6.3.0 useNavigate instead of useHistory
    // const id = JSON.parse(window.sessionStorage.getItem("userId"))
    const id = window.sessionStorage.getItem("userId")

    // get user name from sessionStorage and db
    useEffect(() => {

        if(id){
            fetch(`/api/user/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCurrentUser(data.data)
            }
            )
        .catch((err) => { console.log(err)})
        }
        

    }, [id]);


    const loginHandler = () => {
        if (!isLoggedin) {
            navigate("/login");
        } else {
            setIsLoggedin(false);
            window.sessionStorage.removeItem("userId");
            setCurrentUser(null)
        }
    }

    return (
        <Wrapper>
            <Div>
                <Link to="/">
                    <Logo alt="logo" src={window.location.origin + "/logo.png"} />
                </Link>
                { isLoggedin ? (<>
                    <Username>
                        Hello! {currentUser?.username}
                    </Username>
                    <SignInButton onClick={loginHandler}>
                        Logout
                    </SignInButton>
                </>) : (
                    <SignInButton onClick={loginHandler}>
                    Login / Sign Up
                    </SignInButton>
                )}
                <Filter />
            </Div>
            
        </Wrapper>
    )
}
const Wrapper = styled.div`
    background-color: var(--color-glitter);
    height: 100vh;
`
const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Logo = styled.img`
    width: 80px;
`
const Link = styled(NavLink)`
    margin: 25px;
`
const Username = styled.h1`
    margin: 25px;
    color: var(--color-green-blue);
`
const SignInButton = styled.button`
    padding: 15px 25px;
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
export default SideBar