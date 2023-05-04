import { useState, useEffect } from "react";
import { Amplify, Auth } from "aws-amplify";
import "./App.css";
import awsconfig from "./aws-exports";
import awsmobile from "./aws-exports";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import NormalPage from "./pages/NormalPage";
import { cookieStorage } from "./config";

Amplify.configure({
  ...awsconfig,
  Auth: {
    cookieStorage: {
      expires: 365,
      httpOnly: true,
    },
  },
});

function App() {
  const [auth, setAuth] = useState(false);
  const [myUserName, setMyUserName] = useState("");

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const myUser = await Auth.currentAuthenticatedUser();
        if (!auth) setAuth(true);
        console.log(auth + "auth");
        setMyUserName(myUser.username);
      } catch (err) {
        console.log(err);
      }
    };
    getCurrentUser();
  }, [auth, myUserName]);

  function logIn() {
    setAuth(true);
  }

  function logOut() {
    setAuth(false);
    setMyUserName("");
  }

  return (
    <>
      {/* {auth ? <h1>You are in the webpage</h1> : <Login />} */}

      <Routes>
        <Route
          path="/login"
          exact
          element={<Login auth={auth} logIn={logIn} />}
        />
        <Route
          path="/normal"
          exact
          element={<NormalPage auth={auth} logOut={logOut} />}
        />
        <Route
          path="/"
          exact
          element={
            auth ? (
              <NormalPage auth={auth} logOut={logOut} />
            ) : (
              <Login auth={auth} logIn={logIn} />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
