import React, { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

export default function NormalPage(props) {
  const navigate = useNavigate();
  console.log(props.auth);
  useEffect(() => {
    if (!props.auth) {
      return navigate("/");
    }
  }, [props.auth]);

  const logOut = async () => {
    await Auth.signOut();
    props.logOut();
    navigate("/");
  };

  return (
    <>
      <h1>Normal Page</h1>
      <button onClick={logOut}>Log Out</button>
    </>
  );
}
