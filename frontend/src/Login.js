import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { auth } from './firebase';

const Login = () => {
  const signIn = () => {};
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/150px-WhatsApp.svg.png"
          alt=""
        />
        <div className="login__text">
          <h1>Signin to WhatsApp Clone</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          SignIn with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
