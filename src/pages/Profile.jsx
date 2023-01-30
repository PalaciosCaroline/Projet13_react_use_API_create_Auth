import React, {useEffect} from 'react'
import HeaderProfile from '../components/HeaderProfile'
import Account from '../components/Account'
import {dataAccount} from './../data/dataMock'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Profile() {
  const isAuthentificated = useSelector((state) => state.user.isAuthentificated);
  const navigate = useNavigate();

  useEffect(() => {
  if (!isAuthentificated) {
      navigate("/login");
  }
  }, [isAuthentificated])


  return (isAuthentificated &&
    <main className="main bg-dark main_profile">
      <HeaderProfile />
      {dataAccount.map((item,index) =>         (<Account key={`account-${index}`} title={item.title} amount={item.amount} text={item.text} />)
    )}
    </main>
  )
}
