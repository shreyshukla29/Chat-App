import "./Login.css";
import assets from "./../../assets/assets";
import { useState } from 'react';
const Login = () => {

    const [currState, setCurrState] = useState("Sign up");

    
  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />

      <form className="login-form">
        <h2>{currState}</h2>
       {currState === 'Sign up' && <input
          type="text"
          className="form-input"
          placeholder="username"
          required
        /> } 
        <input
          type="email"
          className="form-input"
          placeholder="Email address"
          required
        />
        <input type="password" className="form-input" placeholder="password" />
        <button type="submit">{currState ==="Sign up" ? "Create account" : "Login now"}</button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className="login-forgot">
         {currState === 'Sign up' ?  <p className="login-toggle">
            Already h&apos;ve an account 
            <span
            onClick= {()=> setCurrState('Login')}>{' '}Login here</span>
          </p>
:
          <p className="login-toggle">
            Create an account 
            <span
            onClick= {()=> setCurrState('Sign up')}>{' '}click here</span>
          </p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
