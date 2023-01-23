import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import Form from './../components/Form'

export default function Login() {
  return (
    <main className="main bg-dark main_login">
      <section className="sign-in-content">
        <FaUserCircle className="sign-in-icon"/>
        <h1>Sign In</h1>
        <Form/>
      </section>
  </main>
  )
}
