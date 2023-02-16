import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Account({title, amount, text}) {
  const navigate = useNavigate();

  const viewsTransactions = () => {
    navigate(`/transactions?title=${title}&amount=${amount}&text=${text}`);
  }

  return (
    <section className='account'>
        <div className="account-content-wrapper">
            <h3 className="account-title">{title}</h3>
            <p className="account-amount">{amount}</p>
            <p className="account-amount-description">{text}</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button" onClick={viewsTransactions}>View transactions</button>
        </div>
    </section>
  )
}
