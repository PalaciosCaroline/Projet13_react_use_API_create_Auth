import React, {useState, useEffect } from 'react'
import { useDispatch ,useSelector} from "react-redux";
import { setUserFirstName, setUserLastName} from './../store/user.slice';
import { getDataIdentityUser } from '../hook/getDataUserIdentity';

export default function HeaderProfile() {
  const dispatch = useDispatch();
  const userFirstName = useSelector((state) => state.user.userFirstName);
  const userLastName = useSelector((state) => state.user.userLastName);
  const token = useSelector((state) => state.user.token);
  const [firstName, setFirstName] = useState(userFirstName);
  const [lastName, setLastName] = useState(userLastName);
  const [activeNameForm, setActiveNameForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const editNameForm = () => setActiveNameForm(!activeNameForm)

  useEffect(() => {
    getDataIdentityUser(setIsLoading,setError, token, dispatch)  
    setFirstName(userFirstName)
    setLastName(userLastName)
  }, [dispatch, token])

  console.log(userFirstName)

  const handleUpdateIdentityUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    // let firstNameInput = document.getElementById('inputFirstName').value;
    //   if (!firstNameInput) {
    //   setFirstName(userFirstName);
    // }
    // let lastNameInput = document.getElementById('inputLastName').value;
    //   if (!lastNameInput) {
    //     setLastName(userLastName);
    //   }
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstName , lastName })
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      const res = await data.body;
      dispatch(setUserFirstName(res.firstName))
      dispatch(setUserLastName(res.lastName))
      dispatch(setActiveNameForm(false))
      console.log(data)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <header className='header header_profile'>
        <h1 className='h1_profile'>Welcome back<br /> { !activeNameForm ? <span>{userFirstName} {userLastName}!</span> : ''}</h1>
        { activeNameForm ?
                    ( <div className="container_formName">
                        <form className='formProfile'  onSubmit={handleUpdateIdentityUser}>
                            <div className='box_form'>
                                <div className='box_firstName'>
                                  <div className='box_flexFormName'>
                                      <label htmlFor='firstname'></label>
                                      {/* <input id="inputFirstName" type='text' onChange={onChangeFirstName}
                                      placeholder={userFirstName} required/> */}
                                      <input id="inputFirstName" type='text' onChange={e => setFirstName(e.target.value)} value={firstName}
                                      placeholder={userFirstName} />
                                      <button  className='btnSave' disabled={isLoading}>Save</button>
                                  </div>
                                </div>
                                <div className='box_Name'>
                                  <div className='box_flexFormName'>
                                    <label htmlFor='name'></label>
                                    {/* <input id="inputLastName" type='text' onChange={onChangeLastName} 
                                    placeholder={userLastName} required/> */}
                                    <input id="inputLastName" type='text' onChange={e => setLastName(e.target.value)} value={lastName}
                                    placeholder={userLastName} />
                                    <button className='btnCancel' onClick={editNameForm} disabled={isLoading} >Cancel</button>
                                  </div>
                                </div>
                            </div>
                            {/* <div className='button_activeForm'> */}
                                {/* <button  className='btnSave'>Save</button>
                                <button className='btnCancel'>Cancel</button> */}
                            {/* </div> */}
                        </form>
                      </div>
                    ) : (
                    <button className="edit-button" onClick={editNameForm}>Edit Name</button>
                    )}
       
        <h2 className="sr-only">Accounts</h2>
    </header>
  )
}
