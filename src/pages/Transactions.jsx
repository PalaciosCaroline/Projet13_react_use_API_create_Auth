import React, {useState} from 'react'
import { useLocation } from 'react-router-dom';
import { FaChevronDown , FaPen} from 'react-icons/fa';

export default function Transactions() {
    const [showDetails, setShowDetails] = useState(false);
    const location = useLocation();
    const params = new URLSearchParams(location.search);  
    const title = params.get("title");
    const amount = params.get("amount");
    const text = params.get("text");

    const data = [
        { date: '2023-02-15', description: 'Achat de nourriture', amount: 15.50, balance: 100.00, transactionType: 'Débit', category: 'Nourriture', notes: ''},
        { date: '2023-02-16', description: 'Paiement de facture', amount: -50.00, balance: 84.50 , transactionType: 'Débit', category: 'Nourriture', notes: 'Acheté chez Carrefour'},
        { date: '2023-02-16', description: 'Dépôt', amount: 200.00, balance: 284.50, transactionType: 'Débit', category: 'Nourriture', notes: '' }
    ];

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    }

  return (
    <main>
        <header>
        <hr />
        <p>{title}</p>
        <h2>{amount}</h2>
        <p>{text}</p>
        </header>
    

        <section className='box_transactions_page'>
                <header>
                    <table style={{width: '100%'}}>
                        <thead className='thead_transactions'>
                            <tr>
                                <th className='th_thead_transactions'></th>
                                <th className='th_thead_transactions'>Date</th>
                                <th className='th_thead_transactions'>Description</th>
                                <th className='th_thead_transactions'>Amount</th>
                                <th className='th_thead_transactions'>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                         {data.map((item, index) => (
                            <>
                            
                                 <tr className='row_table' key={index}>
                                    <td><button onClick={toggleDetails}><FaChevronDown/></button></td>
                                    <td style={{width: '25%'}}>{item.date}</td>
                                    <td>{item.description}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.balance}</td>
                                </tr>
                             
                              <tr className='' style={{width: '100%'}}>
                              <td></td>
                              <td><div className='transactions_rest_infos'>
                                   <div className='box_info'> <p>Transaction Type: {item.transactionType}</p></div>
                                   <div className='box_info'> <p>Category: {item.category ? item.category : ''}</p><button><FaPen/></button></div>
                                   <div className='box_info'><p>Notes: {item.notes ? item.notes : ''}</p><button><FaPen/></button></div>  
                                </div>
                                </td>
                                </tr>
                              
                            </>
                            ))}
                        </tbody>
                    </table>
                </header>
            </section>
    </main>
  )
}



