import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom"; 

import Filter from "./Filter";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Authentication/UserContext";


const SideBar = () => {
    const { isLoggedin, setIsLoggedin, currentUser, setCurrentUser } = useContext(UserContext);

    const navigate = useNavigate(); // react-router-dom 6.3.0 useNavigate instead of useHistory
    const id = window.sessionStorage.getItem("userId")

    // get user name from sessionStorage and db
    useEffect(() => {

        fetch(`/api/user/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setCurrentUser(data.data)}
        )
        .catch((err) => { console.log(err)})

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
                <Username>
                    {isLoggedin ? `Hello! ${currentUser.username}` : ""}
                </Username>
                <SignInButton onClick={loginHandler}>
                    {isLoggedin ? "Logout" : "Login / Sign Up"}
                </SignInButton>
                <Filter />
            </Div>
            
        </Wrapper>
    )
}
const Wrapper = styled.div`
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
const Username = styled.p`
    margin: 25px;
    color: var(--color-green-blue);
`
const SignInButton = styled.button`
    margin: 25px;
    border: none;
    border-radius: 5px;
    background: var(--color-powder-blue);
    text-decoration: none;
    font-size: 15px;
    height: 30px;
    margin-right: 20px;
    margin-left: 20px;
    transition: all 300ms ease-in-out;
    cursor: pointer;
    padding: 0 20px;
    &:hover {
        background: var(--color-green-blue);
        color: #fff;
    }
`
export default SideBar