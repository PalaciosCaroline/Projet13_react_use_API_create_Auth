import React from 'react'
import HeaderProfile from '../components/HeaderProfile'
import Account from '../components/Account'

export default function Profile() {

  const dataAccount = [
    {
      title: 'Argent Bank Checking (x8349)',
      amount: '$2,082.79',
      text: 'Available Balance'
    },
    {
      title: 'Argent Bank Savings (x6712)',
      amount: '$10,928.42',
      text: 'Available Balance'
    },
    {
      title: 'Argent Bank Credit Card (x8349)',
      amount: '$184.30',
      text: 'Current Balance'
    }
  ]

  return (
    <main className="main bg-dark main_profile">
      <HeaderProfile />
      {dataAccount.map((item,index) =>         (<Account key={`account-${index}`} title={item.title} amount={item.amount} text={item.text} />)
    )}
    </main>
  )
}
