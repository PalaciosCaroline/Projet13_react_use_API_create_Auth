import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './rootReducer';
import { AES, enc } from 'crypto-js';

const SECRET_KEY = 'mysecretkey';

function encrypt(data) {
  return AES.encrypt(data, SECRET_KEY).toString();
}

function decrypt(data) {
  const bytes = AES.decrypt(data, SECRET_KEY);
  return bytes.toString(enc.Utf8);
}

export function useLocalStorageCredentials() {
  const { email, password } = useSelector((RootState) => RootState.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const persistedEmail = localStorage.getItem('email');
    const persistedPassword = localStorage.getItem('password');
    if (persistedEmail && persistedPassword) {
      dispatch({
        type: 'LOGIN',
        payload: {
          email: decrypt(persistedEmail),
          password: decrypt(persistedPassword),
        },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('email', encrypt(email));
    localStorage.setItem('password', encrypt(password));
  }, [email, password]);

  return;
}