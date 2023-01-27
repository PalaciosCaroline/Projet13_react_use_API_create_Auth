import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { setToken} from './../store/user.slice';
import { useDispatch } from 'react-redux';
// import { setUserFirstName, setUserName } from '../store/user.slice';

export default function Form() {
  const dispatch = useDispatch();

  // const data = {
  //   email: 'example@example.com',
  //   password: 'password123'
  // };


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
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
      console.log(data);
      dispatch(setToken(data.token))
      // dispatch(setUserFirstName(data.firstName))
      // dispatch(setUserName(data.name))
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
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
          <button type="submit" className="sign-in-button"  disabled={isLoading}>Sign In</button>
          {error && <p>{error.message}</p>}
    </form>
  )
}
