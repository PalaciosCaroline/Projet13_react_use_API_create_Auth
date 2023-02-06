import React, {useState, useEffect} from 'react'
import { Link, redirect ,  useNavigate} from 'react-router-dom'
import { setToken, setIsAuthentificated, setUserFirstName, setUserLastName, setErrorLogin} from './../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { AES, enc } from 'crypto-js'
// import { setUserFirstName, setUserName } from '../store/user.slice';

const KEY = "g5yFO1236Dxilp";


export default function Form() {
  const dispatch = useDispatch();
  const navigate =  useNavigate();
  // const token = useSelector((state) => state.user.token);
  const isAuthentificated = useSelector((state) => state.user.isAuthentificated);
  const errorLogin = useSelector((state) => state.user.errorLogin);
  const [rememberMe, setRememberMe] = useState(false);
  // const userFirstName = useSelector((state) => state.user.userFirstName);
  // const userLastName = useSelector((state) => state.user.userLastName);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const encryptedEmail = localStorage.getItem("email");
    const encryptedPassword = localStorage.getItem("password");
    if (encryptedEmail && encryptedPassword) {
      setEmail(AES.decrypt(encryptedEmail, KEY).toString(enc.Utf8));
      setPassword(AES.decrypt(encryptedPassword, KEY).toString(enc.Utf8));
      setRememberMe(true);
    }
  }, []);

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
    if (event.target.checked) {
      localStorage.setItem(
        "email",
        AES.encrypt(email, KEY).toString()
      );
      localStorage.setItem(
        "password",
        AES.encrypt(password, KEY).toString()
      );
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  };

  
  const handleFormLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
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
      navigate('/profile');
    } catch (error) {
      dispatch(setErrorLogin(error))
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (isAuthentificated) {
  //     navigate('/profile')
  //   }
  // }, [isAuthentificated, navigate])

 
  return (
    <form onSubmit={handleFormLogin}>
          <div className="input-wrapper">
            <label htmlFor="email">Username</label
            ><input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete='email'/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label
            ><input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete='password'/>
          </div>
          <div className="input-remember">
            <label htmlFor="remember-me">
              <input type="checkbox" id="remember-me"  checked={rememberMe} 
              // onChange={e => setRememberMe(e.target.checked)} 
              onChange={handleRememberMe} 
              />
                Remember me
            </label>

          </div>
          <button type="submit" className="sign-in-button"  disabled={isLoading}>Sign In</button>
          {errorLogin && <p>UserName or Password is incorrect</p>}
    </form>
  )
}
