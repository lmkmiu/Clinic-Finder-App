import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginConfirm = ({ user }) => {
    const navigate = useNavigate(); // react-router-dom 6.3.0 useNavigate instead of useHistory

  return (
    <ContinueToWatchButton
      onClick={() => {
        navigate("/");
      }}
    >
      <GreetingImage src="" alt="logIn Confirm Pic" />
      <GreetingMessage>Go to shop</GreetingMessage>
    </ContinueToWatchButton>
  );
};

export default LoginConfirm;

const ContinueToWatchButton = styled.button`
  position: absolute;
  width: 800px;
  height: 500px;
  z-index: 100;
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
  padding: 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const GreetingImage = styled.img`
  width: 800px;
  height: 500px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
`;
const GreetingMessage = styled.span`
  position: absolute;
  bottom: 150px;
  left: 340px;
  font-size: 1.5rem;
  color: #dfebed;
  &:hover {
    color: #c9356c;
  }
`;
