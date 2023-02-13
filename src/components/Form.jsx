import React, {useState, useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import { setToken, setIsAuthentificated} from './../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { AES, enc } from 'crypto-js'
import {login} from './../hook/useLogin'
import  {useLocalStorageLogin, useLocalStorageToken} from './../hook/useLocaleStorage'

// const KEY = "g5yFO1236Dxilp";


export default function Form() {
  const dispatch = useDispatch();
  const navigate =  useNavigate();
  const token = useSelector((state) => state.user.token);
  const isAuthentificated = useSelector((state) => state.user.isAuthentificated);
  const errorLogin = useSelector((state) => state.user.errorLogin);
  // const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

 const { rememberMe, setRememberMe,
  handleRememberMe} = useLocalStorageLogin(email, setEmail, password, setPassword);
  // useEffect(() => {
  //   const encryptedLoginUser = localStorage.getItem("loginUser");
  //   if (encryptedLoginUser) {
  //     const decryptedLoginUser = JSON.parse(AES.decrypt(encryptedLoginUser, KEY).toString(enc.Utf8));
  //     setEmail(decryptedLoginUser.email);
  //     setPassword(decryptedLoginUser.password);
  //     setRememberMe(true);
  //   }
  // }, []);

  // const handleRememberMe = (event) => {
  //   setRememberMe(event.target.checked);
  //   if (event.target.checked) {
  //     const loginUser = { email, password };
  //     localStorage.setItem(
  //       "loginUser",
  //       AES.encrypt(JSON.stringify(loginUser), KEY).toString()
  //     );
  //   } else {
  //     localStorage.removeItem("loginUser");
  //   }
  // };

    useLocalStorageToken(dispatch, token, setToken, setIsAuthentificated)

    useEffect(() => {
      if (errorLogin) {
        alert(errorLogin);
      }
    }, [errorLogin]); 


    const handleFormLogin = (event) => {
      event.preventDefault()
     login(setIsLoading, email, password, dispatch)
    }

    useEffect(() => {
      if (isAuthentificated) {
        navigate('/profile')
      }
    }, [isAuthentificated, navigate]);
  

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
