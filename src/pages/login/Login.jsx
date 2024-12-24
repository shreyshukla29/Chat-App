import "./Login.css";
import assets from "./../../assets/assets";
import { useState } from 'react';
import {signup, login} from "../../config/firebase"
import { toast } from 'react-toastify';
const Login = () => {

    const [currState, setCurrState] = useState("Sign up");
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onSubmitHandler = (e)=>{
      e.preventDefault();

      if(password.length < 8){
        toast.error('password should be of length more than 8')
        return;
      }

      if(currState === 'Sign up'){
        signup(username,email,password)
        setUsername('')
        setEmail('')
        setPassword('')
      }
      else if(currState === 'Login'){
        login(email,password)
      }

    }

  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />

      <form className="login-form"
      onSubmit={onSubmitHandler}>
        <h2>{currState}</h2>
       {currState === 'Sign up' && <input
          type="text"
          className="form-input"
          placeholder="username"
          required
          onChange={(e)=> setUsername(e.target.value)}
        /> } 
        <input
          type="email"
          className="form-input"
          placeholder="Email address"
          required
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input type="password" className="form-input" placeholder="password"
        required
         onChange={(e)=>setPassword(e.target.value)} />
      
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
