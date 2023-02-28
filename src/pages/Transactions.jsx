import React, {useEffect, useState, useRef} from 'react'
import { useLocation } from 'react-router-dom';
import { FaChevronDown , FaChevronUp, FaPen} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Transactions() {
    document.title = 'Argent Bank - Transactions Page'
    const location = useLocation();
    const textareaRef = useRef(null);
    const params = new URLSearchParams(location.search);  
    const title = params.get("title");
    const amount = params.get("amount");
    const text = params.get("text");
    const [linesVisible, setLinesVisible] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editNoteIndex, setEditNoteIndex] = useState(null);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate])
       
    function toggleLine(row) {
      const updatedLinesVisible = [...linesVisible];
      updatedLinesVisible[row] = !updatedLinesVisible[row];
      setLinesVisible(updatedLinesVisible);
    }

    function handleEditClick(index) {
        setEditIndex(index);
    }

    const [data, setData] = useState([
        { date: 'June 20th,2020', description: 'Golden Sun Bakery', amount: 5.00, balance: 2082.79, transactionType: 'Débit', category: 'Food', notes: 'Croissant Bakery'},
        { date: 'June 20th,2020', description: 'Golden Sun Bakery', amount: 10.00, balance: 2087.79, transactionType: 'Débit', category: '', notes: ''},
        { date: 'June 20th,2020', description: 'Golden Sun Bakery', amount: 20.00, balance: 2097.79, transactionType: 'Débit', category: 'Transport', notes: ''},
        { date: 'June 20th,2020', description: 'Golden Sun Bakery', amount: 30.00, balance: 2117.79, transactionType: 'Débit', category: 'Home', notes: ''},
        { date: 'June 20th,2020', description: 'Golden Sun Bakery', amount: 40.00, balance: 2147.79 , transactionType: 'Débit', category: '', notes: 'Acheté chez Carrefour'},
        { date: 'June 20th,2020', description: 'Golden Sun Bakery', amount: 50.00, balance: 2187.79, transactionType: 'Débit', category: '', notes: '' }
    ]);

    function handleEditNoteClick(index) {
        setEditNoteIndex(index);
      }
      
    function handleSaveClick(index, value) {
    const newData = [...data];
    newData[index].notes = value;
    setData(newData);
    setEditNoteIndex(null);
    }
    
    function handleCancelClick() {
    setEditNoteIndex(null);
    }

    return (
    <main id='main_transaction'>
          <hr />
        <header className='header_transaction'>
            <p>{title}</p>
            <h2 className='h2_transaction'>{amount}</h2>
            <p>{text}</p>
        </header>

        <section className='box_transactions_page'>
            <header>
                <table style={{width: '100%'}}>
                    <thead className='thead_transactions'>
                        <tr>
                            <th className='th_thead_transactions'></th>
                            <th className='th_thead_transactions th_date'>Date</th>
                            <th className='th_thead_transactions'>Description</th>
                            <th className='th_thead_transactions th_amount'>Amount</th>
                            <th className='th_thead_transactions'>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                        <>
                            <tr className='row_table' key={index} style={{ borderTop: '1px solid black' }}>
                                <td><button className='btn_icon' onClick={() => toggleLine(index)}>{linesVisible[index] ? <FaChevronUp/> : <FaChevronDown/>}</button></td>
                                <td className='td_date' style={{width: '17%'}}>{item.date}</td>
                                <td>{item.description}</td>
                                <td>${item.amount.toFixed(2)}</td>
                                <td>${item.balance.toFixed(2)}</td>
                            </tr>  
                            <tr  style={{ display: linesVisible[index] ? 'table-row' : 'none' }} >
                                <td className='td_bg'></td>
                                <td colSpan={4} className='transactions_rest_infos'>
                                    <div className='box_info'> <p>Transaction Type: {item.transactionType}</p></div>
                                    <div className='box_info'>
                                        <p>Category: {item.category ? item.category : ''}</p>
                                        <button className='btn_icon' onClick={() => handleEditClick(index)}><FaPen/></button>
                                        <select
                                            value={item.category}
                                            hidden={editIndex !== index}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setData((prevData) => {
                                                const newData = [...prevData];
                                                newData[index].category = value;
                                                setEditIndex(!index);
                                                return newData;
                                                });
                                            }}
                                        >
                                            <option value="">Select a category</option>
                                            <option value="Food">Food</option>
                                            <option value="Home">Home</option>
                                            <option value="leisure">Leisure</option>
                                            <option value="Transport">Transport</option>
                                        </select>
                                    </div>
                                    <div className='box_info'><p>Notes: {item.notes ? item.notes : ''}</p><button onClick={() => handleEditNoteClick(index)} className='btn_icon'><FaPen /></button>
                                    </div>  
                                    {editNoteIndex === index && (  
                                    <div>
                                        <textarea  ref={textareaRef} defaultValue={item.notes} />
                                        <button className='btn_saveTransaction' onClick={() => handleSaveClick(index, textareaRef.current.value)}>Save</button>
                                        <button className='btn_cancelTransaction' onClick={() => handleCancelClick()}>Cancel</button>
                                    </div>)}
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



