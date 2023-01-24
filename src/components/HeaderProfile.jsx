import React from 'react'

export default function HeaderProfile() {
  return (
    <header className='header header_profile'>
        <h1>Welcome back<br />Tony Jarvis!</h1>
        <button className="edit-button">Edit Name</button>
        <h2 className="sr-only">Accounts</h2>
    </header>
  )
}
