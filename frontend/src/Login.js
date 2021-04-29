import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

const Login = () => {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        localStorage.setItem('userInfo', JSON.stringify(result.user));
      })
      .catch((error) => console.log(error.message));
  };
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
