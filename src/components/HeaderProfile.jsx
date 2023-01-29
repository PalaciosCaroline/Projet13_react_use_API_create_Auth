import React, {useState} from 'react'
import { useDispatch ,useSelector } from "react-redux";
import { setUserFirstName, setUserLastName} from './../store/user.slice';


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

  const onChangeName = (e) => {
    setLastName(e.target.value)
  }
  const onChangeFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const editNameForm = () => setActiveNameForm(!activeNameForm)

  const handleFormNameSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
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
      console.log(res)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <header className='header header_profile'>

        <h1 className='h1_profile'>Welcome back<br /> { !activeNameForm ? <span>Tony Jarvis!</span> : ''}</h1>
        { activeNameForm ?
                    ( <div className="container_formName">
                        <form className='formProfile'  onSubmit={handleFormNameSubmit}>
                            <div className='box_form'>
                                <div className='box_firstName'>
                                  <div className='box_flexFormName'>
                                      <label htmlFor='firstname'></label>
                                      <input type='text' onChange={onChangeFirstName} 
                                      placeholder={userFirstName}/>
                                      <button  className='btnSave' disabled={isLoading}>Save</button>
                                  </div>
                                </div>
                                <div className='box_Name'>
                                  <div className='box_flexFormName'>
                                    <label htmlFor='name'></label>
                                    <input type='text' onChange={onChangeName} 
                                    placeholder={userLastName}/>
                                    <button className='btnCancel' onClick={editNameForm} disabled={isLoading}>Cancel</button>
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
