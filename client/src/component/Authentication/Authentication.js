import styled from "styled-components";
import { useState, useRef, useEffect, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserContext } from "./UserContext";
import { auth } from "./firebase"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";

import LoginConfirm from "./LoginConfirm"; 

const Authentication = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isSignup, setIsSignup] = useState(true);
    const [username, setUsername] = useState(null)
    const { setCurrentUser,   
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
            toast.success("🦄 Welcome!!", {
                theme: "colored"
            })
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
                username
                );
                
                
                // .POST to save new user info to mongoDb users collection

            await fetch("/api/new-users", {
                        method: "POST",
                        body: JSON.stringify({ email, password, _id: result.user.uid, username }),
                        headers: {  Accept: "application/json",
                                            "Content-Type": "application/json",
                                },
                        })
                    .then((res) => res.json())
                    .then((data) => { 
                        if (data.status === 200) {
                            setCurrentUser({ email, password, _id: result.user.uid, username });
                            // Save user id into session storage for keeping user login state
                            window.sessionStorage.setItem("userId", result.user.uid);
                        }
            }) 
                
                
      // Change Login state
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setIsLoggedin(true);
                } else setIsLoggedin(false);
            });
        } catch (err) {
            toast.error(err.code, {
                theme: "colored"
            })
        }
    };

// handler for logIn 
    const loginHandler = async (e) => {
        e.preventDefault();
    try { toast.success("🦄 Welcome!!", {
            theme: "colored"
        })
      // Firebase auth. checks user validation. (is member?)
        const result = await signInWithEmailAndPassword(auth, email, password);
        await window.sessionStorage.setItem("userId", result.user.uid)

      // Change Login state
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setIsLoggedin(true);
                } else setIsLoggedin(false);
            });
        } catch (err) {
            toast.error(err.code, {
                theme: "colored"
            })
        }
    };


return (
    <BigWrapper>
        <ModalBackground>
        <Wrapper>
            {isLoggedin && <LoginConfirm user={email} />}
            <ToastContainer />

            <LoginContentWrapper>
                <Form onSubmit={isSignup ? loginHandler : signupHandler}>
                    <CaptionForGreeting>
                        Welcome to Bonne Santé 
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
                    <Input  onChange={(e) => setEmail(e.target.value)}
                            ref={inputRef}
                            type="email"
                            placeholder="Email"
                            required
                    />
                    <Input  onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                            placeholder="Password"
                    />
                    <div disabled={isSignup? true: false}>
                        <Input  onChange={(e) => setUsername(e.target.value)}
                                type="username"
                                placeholder="Username"
                        />
                    </div>
                    <SubmitButton>
                        {isSignup ? "login now" : "Sign up now"}
                    </SubmitButton>
                </Form>
            </LoginContentWrapper>
        </Wrapper>
        </ModalBackground>
    </BigWrapper>
)
};


const BigWrapper = styled.div`
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
    align-self: center;
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
    color: var(--color-fandango-pink);
    margin: 25px;
    font-size: 20px;
`;
const OptionsWrapper = styled.div`
    margin: 10px;
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
const Input = styled.input`
    margin: 5px;
    border: none;
    border-radius: 5px;
    padding: 0 10px;
    height: 30px;
    width: 18rem;
`;
const SubmitButton = styled.button`
    padding: 20px 40px;
    margin: 10px;
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

export default Authentication;