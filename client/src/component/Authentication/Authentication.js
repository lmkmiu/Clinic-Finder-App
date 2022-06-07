import styled from "styled-components";
import { useState, useRef, useEffect, useContext } from "react";

import { UserContext } from "./UserContext";
import { auth } from "./firebase"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";

import LoginConfirm from "./LoginConfirm"; 

const Authentication = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(true);
    const { currentUser, 
            setCurrentUser, 
            setNewUser,    
            isLoggedin, 
            setIsLoggedin } = useContext(UserContext);

  // Focus on the first input element to draw user's attention
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const isSignupToggleHandler = () => {
        setIsSignup(!isSignup);
    };

  // **************************************
  // Basic functions for Authentication
  // **************************************

  // User state handler to check if a user logged in or not

    const signupHandler = async (e) => {
    // When new user sign up, firebase auth. graps user's info and save it inside its own db
    // Apart from that, we will grap user info to use our own db
    // And when user successfully sign up, the user will be logged in automatically.
        e.preventDefault();
    try {
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        setNewUser({ email, password, _id: result.user.uid });
        setCurrentUser({ email, password, _id: result.user.uid });

      // Save user id into session storage for keeping user login state
        await window.sessionStorage.setItem("userId", result.user.uid);

      // Change Login state
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setIsLoggedin(true);
                } else setIsLoggedin(false);
            });
        } catch (err) {
            window.alert(err.code);
        }
    };

    const loginHandler = async (e) => {
        e.preventDefault();
    try {
      // Firebase auth. checks user validation. (is member?)
        const result = await signInWithEmailAndPassword(auth, email, password);
        await window.sessionStorage.setItem("userId", result.user.uid);

      // Change Login state
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setIsLoggedin(true);
                } else setIsLoggedin(false);
            });
        } catch (err) {
            window.alert(err.code);
        }
    };


return (
    <Modalwrapper>
        <ModalBackground>
        <Wrapper>
            {isLoggedin && <LoginConfirm user={email} />}

            <LoginContentWrapper>
                <Form onSubmit={isSignup ? loginHandler : signupHandler}>
                    <CaptionForGreeting>
                        welcome to Bonne Santé 
                    </CaptionForGreeting>

                    {isSignup && (
                        <OptionsWrapper>
                            <CaptionForLogin>Log in to continue</CaptionForLogin>
                            <CaptionForRegister> Not member yet? </CaptionForRegister>
                            <Register onClick={isSignupToggleHandler}>
                                Register now
                            </Register>
                        </OptionsWrapper>
                    )}

                    <InputForEmail  onChange={(e) => setEmail(e.target.value)}
                                    ref={inputRef}
                                    type="email"
                                    placeholder="Email"
                                    required
                    />

                    <InputForPassword   onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        required
                                        placeholder="Password"
                    />
                    <SubmitButton>
                        {isSignup ? "login now" : "Sign up now"}
                    </SubmitButton>
                </Form>
            </LoginContentWrapper>
        </Wrapper>
        </ModalBackground>
    </Modalwrapper>
)
};


const Modalwrapper = styled.div`
    display: flex;
    justify-content: center;
`;
const ModalBackground = styled.div`
    background-color: var(--color-glitter);
    width: 100%;
    max-width: 1360px;
    height: 100vh;
    display: flex;
    justify-content: center;
    box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
`;
const Wrapper = styled.div`
    margin-top: 200px;
    background: var(--color-powder-blue);
    width: 800px;
    height: 500px;
    display: flex;
    border: none;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
`;

const LoginContentWrapper = styled.div`
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;   
    align-items: center;
`;
const CaptionForGreeting = styled.span`
    text-transform: uppercase;
    color: gray;
    margin-bottom: 50px;
    font-size: 0.8rem;
`;
const OptionsWrapper = styled.div`
    margin-bottom: 20px;
`;
const CaptionForLogin = styled.span`
    margin-right: 10px;
    font-weight: 800;
    font-size: 0.8rem;
`;
const CaptionForRegister = styled.span`
    font-size: 0.8rem;
    margin-right: 5px;
`;
const Register = styled.span`
    color: var(--color-green-blue);
    font-weight: 800;
    cursor: pointer;
    &:hover {
        color: var(--color-fandango-pink);
    }
`;

const InputForEmail = styled.input`
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
    padding: 0 10px;
    height: 30px;
    width: 18rem;
`;
const InputForPassword = styled.input`
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
    padding: 0 10px;
    height: 30px;
    width: 18rem;
`;

const SubmitButton = styled.button`
    text-transform: uppercase;
    background: var(--color-green-blue);
    margin-bottom: 20px;
    border: none;
    border-radius: 5px;
    color: #fff;
    height: 30px;
    width: 18rem;
    margin-bottom: 40px;
    cursor: pointer;
    &:hover {
        border: black 2px solid;
    }
`

export default Authentication;