import React from 'react'
import HeaderProfile from '../components/HeaderProfile'
import Account from '../components/Account'
import {dataAccount} from './../data/dataMock'
import { redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Profile() {
  const isAuthentificated = useSelector((state) => state.user.isAuthentificated);

  if (!isAuthentificated) {
      return redirect("/login");
  }

  return (
    <main className="main bg-dark main_profile">
      <HeaderProfile />
      {dataAccount.map((item,index) =>         (<Account key={`account-${index}`} title={item.title} amount={item.amount} text={item.text} />)
    )}
    </main>
  )
}
