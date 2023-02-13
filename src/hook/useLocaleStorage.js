import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { AES, enc } from 'crypto-js';

const KeyLogin = 'g5yFO1236Dxilp';
const KeyToken = "groqIU25xdd";

export function useLocalStorageLogin(email, setEmail, password, setPassword){
  const [rememberMe, setRememberMe] = useState(false);

  const loadDataFromLocalStorage = () => {
    const encryptedLoginUser = localStorage.getItem("loginUser");
    if (encryptedLoginUser) {
      const decryptedLoginUser = JSON.parse(AES.decrypt(encryptedLoginUser, KeyLogin).toString(enc.Utf8));
      setEmail(decryptedLoginUser.email);
      setPassword(decryptedLoginUser.password);
      setRememberMe(true);
    }
  };

  const saveLoginToLocalStorage = (event) => {
    if (event.target.checked) {
      const loginUser = { email, password };
      localStorage.setItem(
        "loginUser",
        AES.encrypt(JSON.stringify(loginUser), KeyLogin).toString()
      );
    } else {
      localStorage.removeItem("loginUser");
    }
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
    saveLoginToLocalStorage(event);
  };

  return {
    rememberMe, setRememberMe,
    handleRememberMe,
  };
};


export function useLocalStorageToken(dispatch, token, setToken, setIsAuthentificated) {

  useEffect(() => {
    const encryptedToken = localStorage.getItem("token");
    if (encryptedToken) {
      const decryptedToken = JSON.parse(AES.decrypt(encryptedToken,KeyToken).toString(enc.Utf8));
      dispatch(setToken(decryptedToken));
      dispatch(setIsAuthentificated(true));
    }
  }, [dispatch,setToken,setIsAuthentificated ]);
  
  useEffect(() => {
    if (token) {
        localStorage.setItem(
          "token",
          AES.encrypt(JSON.stringify(token), KeyToken).toString()
        );
        }
  }, [token]);

  return
}