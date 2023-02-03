import React, {useState, useEffect} from 'react'
import { Link, redirect ,  useNavigate} from 'react-router-dom'
import { setToken, setIsAuthentificated, setUserFirstName, setUserLastName, setErrorLogin} from './../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { AES, CryptoJS, enc } from 'crypto-js'
// import { setUserFirstName, setUserName } from '../store/user.slice';

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


  // useEffect(() => {
  //   const emailLocal = localStorage.getItem('email');
  //   const passwordLocal = localStorage.getItem('password');
  //   if (emailLocal && passwordLocal) {
  //     const decryptedemail = AES.decrypt(emailLocal,"g5yFO1236Dx-ilp" ).toString(CryptoJS.enc.Utf8);
  //     const { email } = JSON.parse(decryptedemail);
  //     const decryptedPassword = AES.decrypt(passwordLocal,"g5yFO1236Dx-ilp" ).toString(CryptoJS.enc.Utf8);
  //     const { password } = JSON.parse(decryptedPassword);
  //     setEmail(email);
  //     setPassword(password);
  //   }
  // }, []);


  // window.onload = function() {
    // if (localStorage.getItem("email") && localStorage.getItem("password")) {
    //   const passwordKey = "g5yFO1236Dx-ilp";
    //   const ciphertext = localStorage.getItem("email");
    //   const plaintext = CryptoJS.AES.decrypt(ciphertext, passwordKey).toString(CryptoJS.enc.Utf8);
    //   const email = JSON.parse(plaintext);
    //   const ciphertext2 = localStorage.getItem("password");
    //   const plaintext2 = CryptoJS.AES.decrypt(ciphertext2, passwordKey).toString(CryptoJS.enc.Utf8);
    //   const password = JSON.parse(plaintext2);
    //   document.getElementById("email").value = email;
    //   document.getElementById("password").value = password;
    //   document.getElementById("remember-me").checked = true;
    // }
  // };
 
  
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
      if (res) {
        // localStorage.setItem('token', res.token);
        if (rememberMe) {
          const ciphertext = AES.encrypt(email, 'g5yFO1236Dx-ilp').toString();
          localStorage.setItem('email', ciphertext);
          const ciphertext2 = AES.encrypt(password, 'g5yFO1236Dx-ilp').toString();
          localStorage.setItem('password', ciphertext2);
        } else {
          if(localStorage.getItem("email") && localStorage.getItem("password"))
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
      }
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
              onChange={e => setRememberMe(e.target.checked)} 
              />
                Remember me
            </label>

          </div>
          <button type="submit" className="sign-in-button"  disabled={isLoading}>Sign In</button>
          {errorLogin && <p>UserName or Password is incorrect</p>}
    </form>
  )
}
