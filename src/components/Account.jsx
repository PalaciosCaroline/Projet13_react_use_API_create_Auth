import React from 'react'

export default function Account({title, amount, text}) {
  return (
    <section className='account'>
        <div class="account-content-wrapper">
            <h3 class="account-title">{title}</h3>
            <p class="account-amount">{amount}</p>
            <p class="account-amount-description">{text}</p>
        </div>
        <div class="account-content-wrapper cta">
          <button class="transaction-button">View transactions</button>
        </div>
    </section>
  )
}
