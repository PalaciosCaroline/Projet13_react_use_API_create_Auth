import { useEffect, useState, useCallback } from 'react';
import { AES, enc } from 'crypto-js';

const KeyLogin = 'g5yFO1236Dxilp';
const KeyToken = "groqIU25xdd";

export function useLocalStorageLogin(email, setEmail, password, setPassword, isAuthentificated){
  const [rememberMe, setRememberMe] = useState(false);

  const loadDataFromLocalStorage = useCallback(() => {
    const encryptedLoginUser = localStorage.getItem("loginUser");
    if (encryptedLoginUser) {
      const decryptedLoginUser = JSON.parse(AES.decrypt(encryptedLoginUser, KeyLogin).toString(enc.Utf8));
      setEmail(decryptedLoginUser.email);
      setPassword(decryptedLoginUser.password);
      setRememberMe(true);
    }
  }, [setEmail, setPassword, setRememberMe]);

  const saveLoginToLocalStorage = (email, password) => {
    const loginUser = { email, password };
    localStorage.setItem(
      "loginUser",
      AES.encrypt(JSON.stringify(loginUser), KeyLogin).toString()
    );
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, [ loadDataFromLocalStorage]);

  useEffect(() => {
    if (isAuthentificated && rememberMe) {
      saveLoginToLocalStorage(email, password);
    }
  }, [isAuthentificated,rememberMe, email, password]);

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
      if(!event.target.checked) {
        localStorage.removeItem("loginUser");
      }
  };

  return {
    rememberMe,
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