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
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isSignup, setIsSignup] = useState(true);
    const [username, setUsername] = useState(null)
    const { newUser, 
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
    // .POST to save new user info to mongoDb users collection
        // useEffect(() => {
        //     const fetchDate = async () => {
        //         await fetch("/api/new-users", {
        //                     method: "POST",
        //                     body: JSON.stringify({ ...newUser }),
        //                     headers: {  Accept: "application/json",
        //                                         "Content-Type": "application/json",
        //                             },
        //                     })
        //             .then((res) => res.json())
        //             .then((data) => { console.log(data)}) 
        //         };
        //     fetchDate();
        // }, [newUser]);

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
                password,
                username
                );
                
        setNewUser({ email, password, _id: result.user.uid, username });
        setCurrentUser({ email, password, _id: result.user.uid, username });

         // .POST to save new user info to mongoDb users collection
        const fetchDate = async () => {
            await fetch("/api/new-users", {
                    method: "POST",
                    body: JSON.stringify({ ...newUser }),
                    headers: {  Accept: "application/json",
                                        "Content-Type": "application/json",
                            },
                    })
                .then((res) => res.json())
                .then((data) => { console.log(data)}) 
        };
        fetchDate();
        

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

// handler for logIn 
    const loginHandler = async (e) => {
        e.preventDefault();
    try {
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
            window.alert(err.code);
        }
    };


return (
    <BigWrapper>
        <ModalBackground>
        <Wrapper>
            {isLoggedin && <LoginConfirm user={email} />}

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
                    <Input   onChange={(e) => setPassword(e.target.value)}
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
const Input = styled.input`
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