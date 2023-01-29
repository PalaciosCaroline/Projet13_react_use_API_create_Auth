import React, {useState} from 'react'
import { Link, redirect ,  useNavigate} from 'react-router-dom'
import { setToken, setIsAuthentificated, setUserFirstName, setUserLastName} from './../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { AES } from 'crypto-js';
// import { setUserFirstName, setUserName } from '../store/user.slice';

export default function Form() {
  const dispatch = useDispatch();
  const navigate =  useNavigate();
  const token = useSelector((state) => state.user.token);
  const isAuthentificated = useSelector((state) => state.user.isAuthentificated);
  const [rememberMe, setRememberMe] = useState(false);
  // const userFirstName = useSelector((state) => state.user.userFirstName);
  // const userLastName = useSelector((state) => state.user.userLastName);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // if (localStorage.getItem("email") !== null && localStorage.getItem("password") !== null) {
  //   // let emailLocale = localStorage.getItem(AES.decrypt("email"));
  //   // let passwordLocale = localStorage.getItem(AES.decrypt("password"));
  //   let emailLocale = localStorage.getItem("email");
  //   let passwordLocale = localStorage.getItem("password");
  //   setEmail(emailLocale)
  //   setPassword(passwordLocale)
  // }


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
   
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      const res = await data.body;
      dispatch(setToken(res.token))
      console.log(res.token)
      dispatch(setIsAuthentificated(true))
      if(email === "tony@stark.com"){
        dispatch(setUserFirstName('Tony'))
        dispatch(setUserLastName('Stark'))
      } else if (email === "steve@rogers.com"){
        dispatch(setUserFirstName('Steve'))
        dispatch(setUserLastName('Rogers'))
      }
      if (rememberMe) {
        // localStorage.setItem('email', AES.encrypt(email));
        // localStorage.setItem('password', AES.encrypt(password));
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      }
      navigate('/profile');
    } catch (error) {
      setError(error);
     
    } finally {
      setIsLoading(false);
    }
  };
 

  return (
    <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label
            ><input type="text" id="username" value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label
            ><input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="input-remember">
            {/* <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label> */}
            <label htmlFor="remember-me">
              <input type="checkbox" id="remember-me"  checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                Remember me
            </label>

          </div>
          <button type="submit" className="sign-in-button"  disabled={isLoading}>Sign In</button>
          {error && <p>UserName or Password is incorrect</p>}
    </form>
  )
}
