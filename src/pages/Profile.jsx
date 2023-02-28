import React, {useEffect} from 'react'
import HeaderProfile from '../components/HeaderProfile'
import Account from '../components/Account'
import {dataAccount} from './../data/dataMock'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Profile() {
  document.title = 'Argent Bank - Profile Page'
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
        navigate("/login");
    }
  }, [isAuthenticated, navigate])

  return (isAuthenticated &&
    <main className="main bg-dark main_profile">
      <HeaderProfile />
      {dataAccount.map((item,index) => (<Account key={`account-${index}`} title={item.title} amount={item.amount} text={item.text} />)
    )}
    </main>
  )
}
