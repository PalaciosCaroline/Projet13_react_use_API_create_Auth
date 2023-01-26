import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import Form from './../components/Form'
import { redirect } from "react-router-dom";


export default function Login() {
  document.title = 'Argent Bank - Home Page'




  
 
    // if (!isAuthentificated) {
    //   return redirect("/login");
    // }


  
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
