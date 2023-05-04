import React, { useState, useEffect } from "react";
import { Amplify, Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [myUser, setMyUser] = useState();
  const [successful, setSuccesful] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.auth) {
      return navigate("/normal");
    }
  }, [props.auth]);

  function handleEmailInput(event) {
    setEmail(event.target.value);
  }

  function handleSecretInput(event) {
    setSecret(event.target.value);
  }

  const submitData = async () => {
    const username = email;
    const password = "holahahaha";
    try {
      await Auth.signUp({
        username,
        email,
        password,
        attributes: {
          email,
        },
      });
    } catch (err) {
      console.log(err);
    }

    try {
      setMyUser(await Auth.signIn(email));
      setSuccesful(true);
    } catch (err) {
      console.log(err);
      setSuccesful(false);
    }
    // setSending(false); // end loading icon
  };

  const submitSecret = async () => {
    console.log(secret);
    try {
      //Auth.sendCustomChallengeAnswer updates myUser.
      console.log(await Auth.sendCustomChallengeAnswer(myUser, secret));
      if (myUser.signInUserSession) {
        navigate("/normal");
        console.log("You are logged in");
        props.logIn();
      } else {
        console.log("something went wrong");
        // setIsIncorrectSecret(true)
      }
    } catch (err) {
      console.log(err);
      //  setHasFailed(true)
    }
  };

  return (
    <>
      <h1>Hola</h1>
      <label htmlFor="username">Email</label>
      <input
        type="text"
        id="email"
        autoComplete="off"
        onChange={handleEmailInput}
        value={email}
      />
      <button onClick={submitData}>Submit</button>
      {successful && (
        <>
          <input
            type="text"
            id="secret"
            autoComplete="off"
            onChange={handleSecretInput}
            value={secret}
          />
          <button onClick={submitSecret}>Submit</button>
        </>
      )}
    </>
  );
}
