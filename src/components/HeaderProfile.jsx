import React, {useState, useEffect } from 'react'
import { useDispatch ,useSelector} from "react-redux";
import { readUserIdentity } from '../hook/readUserIdentity';
import {updateUserIdentity} from './../hook/updateUserIdentity'
import {handleNameChange, controlLenghtName} from './../utils/controlInput'

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

  const editNameForm = () => {
    setFirstName(userFirstName)
    setLastName(userLastName)
    setErrorName('')
    setActiveNameForm(!activeNameForm)
  }

  useEffect(() => {
    readUserIdentity(setIsLoading,setError, token, dispatch)  
  }, [dispatch, token])

  useEffect(() => {
    setFirstName(userFirstName)
    setLastName(userLastName)
  }, [userFirstName, userLastName])

  // const handleFocus = (event) => {
  //   event.target.value = '';
  // };

  

  const handleFirstNameChange = handleNameChange(setErrorName, 'firstname', setFirstName);
  const handleLastNameChange = handleNameChange(setErrorName, 'lastname', setLastName);
 
  const handleUpdateIdentityUser = async (e) => {
    e.preventDefault();
    if(!controlLenghtName(setErrorName, firstName, 'firstname') || !controlLenghtName(setErrorName,lastName, 'lastname')) return;
    setIsLoading(true);
    setError(null);
    updateUserIdentity(setIsLoading,setError, token, firstName, lastName, dispatch) 
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
                              <input id="input_firstname" type='text'
                                      // onFocus={handleFocus} 
                                      onChange={handleFirstNameChange} 
                                      value={firstName} 
                                      // placeholder={userFirstName} 
                                />

                            <label htmlFor='name'></label>
                              <input id="input_lastname" type='text' 
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
