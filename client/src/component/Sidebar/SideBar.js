import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom"; 

import Filter from "./Filter";
import { useContext } from "react";
import { UserContext } from "../Authentication/UserContext";


const SideBar = () => {
    const { isLoggedin, setIsLoggedin } = useContext(UserContext);
    const navigate = useNavigate(); // react-router-dom 6.3.0 useNavigate instead of useHistory

    const loginHandler = () => {
        if (!isLoggedin) {
            navigate("/login");
        } else {
            setIsLoggedin(false);
            window.sessionStorage.removeItem("userId");
        }
    }

    return (
        <Wrapper>
            <Div>
                <Link to="/">
                    <Logo alt="logo" src={window.location.origin + "/logo.png"} />
                </Link>
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
`
const Logo = styled.img`
    width: 80px;
`
const Link = styled(NavLink)`
    margin: 25px;
`
const SignInButton = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #fff;
  text-decoration: none;
  font-size: 1rem;
  height: 2.3rem;
  margin-right: 20px;
  margin-left: 20px;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  padding: 0 20px;
  &:hover {
    background: #626fe6;
    color: #fff;
  }
`
export default SideBar