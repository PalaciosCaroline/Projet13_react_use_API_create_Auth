import React, {useState} from 'react'
import { useDispatch ,useSelector } from "react-redux";


export default function HeaderProfile() {
  const firstNameUser = useSelector((state) => state.user.firstName);
  const nameUser = useSelector((state) => state.user.name);
  const [firstName, setFirstName] = useState(firstNameUser);
  const [name, setName] = useState(nameUser);
  const [activeNameForm, setActiveNameForm] = useState(false);

  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangeFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const editNameForm = () => setActiveNameForm(!activeNameForm)
  const handleFormNameSubmit = (e) => {
    e.preventDefault();
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
                                    // value={firstName} 
                                    placeholder={firstNameUser}/>
                                    <button  className='btnSave'>Save</button>
                                  </div>
                                </div>
                                <div className='box_Name'>
                                  <div className='box_flexFormName'>
                                    <label htmlFor='name'></label>
                                    <input type='text' onChange={onChangeName} 
                                    // value={name} 
                                    placeholder={nameUser}/>
                                    <button className='btnCancel' onClick={editNameForm}>Cancel</button>
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
