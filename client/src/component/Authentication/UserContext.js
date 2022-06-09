import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [newUser, setNewUser] = useState({
    logInName: null,
    email: null,
    password: null,
    _id: null,
    username: null
  });
  const [currentUser, setCurrentUser] = useState({
    email: null,
    password: null,
    _id: null,
  });
  const [isLoggedin, setIsLoggedin] = useState(false);

  // .GET to get user info with user id remained in session storage
  useEffect(() => {
    if (window.sessionStorage.getItem("userId")) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        newUser,
        setNewUser,
        currentUser,
        setCurrentUser,
        setIsLoggedin,
        isLoggedin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
