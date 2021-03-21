import React from 'react';
import firebase from "firebase";

export const Login = () => {
  const auth = firebase.auth()

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const {user} = await auth.signInWithPopup(provider)
  }

  return (
    <div>
      <button className={"btn btn-success"} onClick={login}>Sign in with Google</button>
    </div>
  );
};