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
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [error, setError] = useState("");

  const editNameForm = () => {
    setFirstName(userFirstName)
    setLastName(userLastName)
    setErrorFirstName('')
    setErrorLastName('')
    setActiveNameForm(!activeNameForm)
  }

  useEffect(() => {
    readUserIdentity(setIsLoading,setError, token, dispatch)  
  }, [dispatch, token])

  useEffect(() => {
    setFirstName(userFirstName)
    setLastName(userLastName)
  }, [userFirstName, userLastName])

  const handleFirstNameChange = handleNameChange(setErrorFirstName, 'firstname', setFirstName);
  const handleLastNameChange = handleNameChange(setErrorLastName, 'lastname', setLastName);
 
  const handleUpdateIdentityUser = async (e) => {
    e.preventDefault();
    if(!controlLenghtName(setErrorFirstName, firstName, 'firstname') || !controlLenghtName(setErrorLastName,lastName, 'lastname')) return;
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
                          <div className='box-error_input'>
                            {errorFirstName && <p className='errorInputFirstName'>{errorFirstName}</p>}
                            <label htmlFor='firstname'></label>
                              <input id="input_firstname" type='text'                          
                                onChange={handleFirstNameChange} 
                                value={firstName} 
                                placeholder={firstName ? '' : 'Fistname'}
                                />
                          </div>
                          <div className='box-error_input'>
                          {errorLastName && <p className='errorInputLastName'>{errorLastName}</p>}
                            <label htmlFor='name'></label>
                              <input id="input_lastname" type='text' 
                                onChange={handleLastNameChange} 
                                value={lastName}
                                placeholder={lastName ? '' : 'Lastname'}
                              />
                             </div>
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
