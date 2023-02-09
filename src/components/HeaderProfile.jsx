import React, {useState, useEffect } from 'react'
import { useDispatch ,useSelector} from "react-redux";
import { setUserFirstName, setUserLastName} from './../store/user.slice';
import { getDataIdentityUser } from '../hook/getDataUserIdentity';
import {updateDataUserIdentity} from './../hook/updateDataUserIdentity'

export default function HeaderProfile() {
  const dispatch = useDispatch();
  const userFirstName = useSelector((state) => state.user.userFirstName);
  const userLastName = useSelector((state) => state.user.userLastName);
  const token = useSelector((state) => state.user.token);
  const [firstName, setFirstName] = useState(userFirstName);
  const [lastName, setLastName] = useState(userLastName);
  const [activeNameForm, setActiveNameForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorName, setErrorName] = useState('');
  // const [errorFirstName, setErrorFirstName] = useState('');
  // const [errorLastName, setErrorLastName] = useState('');
  const [error, setError] = useState("");

  const editNameForm = () => setActiveNameForm(!activeNameForm)

  useEffect(() => {
    getDataIdentityUser(setIsLoading,setError, token, dispatch)  
  }, [dispatch, token])

  useEffect(() => {
    setFirstName(userFirstName)
    setLastName(userLastName)
  }, [userFirstName, userLastName])

  // const handleFocus = (event) => {
  //   event.target.value = '';
  // };

  const handleNameChange = (setName, errorMessage) => event => {
    const input = event.target.value;
    const regex = /^[a-zA-Z-' ]{0,40}?$/;
    if (!regex.test(input)) {
      setErrorName(errorMessage);
      return;
    } else if (regex.test(input) && input.length >= 0) {
      setErrorName('');
      setName(input);
    }
  };

  const handleFirstNameChange = handleNameChange(setFirstName, 'Veuillez rentrer un prénom valide');
  const handleLastNameChange = handleNameChange(setLastName, 'Veuillez rentrer un nom valide');

  const handleUpdateIdentityUser = async (e) => {
    e.preventDefault();
    if(!setErrorName) return;
    setIsLoading(true);
    setError(null);
    updateDataUserIdentity(setIsLoading,setError, token, firstName, lastName, dispatch) 
    // let firstNameInput = document.getElementById('inputFirstName').value;
    //   if (!firstNameInput) {
    //   setFirstName(userFirstName);
    // }
    // let lastNameInput = document.getElementById('inputLastName').value;
    //   if (!lastNameInput) {
    //     setLastName(userLastName);
    //   }
    // try {
    //   const response = await fetch('http://localhost:3001/api/v1/user/profile', {
    //     method: 'PUT',
    //     headers: {
    //       'Authorization': `Bearer ${token}`,
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({firstName , lastName })
    //   });
    //   if (!response.ok) {
    //     throw new Error(response.statusText);
    //   }
    //   const data = await response.json();
    //   const res = await data.body;
    //   dispatch(setUserFirstName(res.firstName))
    //   dispatch(setUserLastName(res.lastName))
    //   dispatch(setActiveNameForm(false))
    //   console.log(data)
    // } catch (error) {
    //   setError(error)
    // } finally {
    //   setIsLoading(false);
    // }
    if (!error) {
      setActiveNameForm(false)
    }
  }
  
  return (
    <header className='header header_profile'>
        <h1 className='h1_profile'>Welcome back<br /> { !activeNameForm ? <span>{userFirstName} {userLastName}!</span> : ''}</h1>
        { activeNameForm ?
                    ( <div className="container_formName">
                        <form className='formProfile'  onSubmit={handleUpdateIdentityUser}>
                        {errorName && <p className='errorInputName'>{errorName}</p>}
                            <label htmlFor='firstname'></label>
                                      {/* <input id="inputFirstName" type='text' onChange={onChangeFirstName}
                                      placeholder={userFirstName} required/> */}
                                      <input id="inputFirstName" type='text'
                                      // onFocus={handleFocus} 
                                      onChange={handleFirstNameChange} 
                                      // value={inputValue}
                                      value={firstName} 
                                      // placeholder={userFirstName} 
                                      />

                            <label htmlFor='name'></label>
                                    {/* <input id="inputLastName" type='text' onChange={onChangeLastName} 
                                    placeholder={userLastName} required/> */}
                                    <input id="inputLastName" type='text' 
                                    // onFocus={handleFocus} 
                                    onChange={handleLastNameChange} 
                                    value={lastName}
                                    // placeholder={userLastName} 
                                    />
                            
                            <div className='button_activeForm'> 
                                <button  className='btnSave' disabled={isLoading}>Save</button>
                                <button className='btnCancel' onClick={editNameForm} disabled={isLoading} >Cancel</button>
                            </div> 
                        </form>
                      </div>
                    ) : (
                    <button className="edit-button" onClick={editNameForm}>Edit Name</button>
                    )}
       
        <h2 className="sr-only">Accounts</h2>
    </header>
  )
}
