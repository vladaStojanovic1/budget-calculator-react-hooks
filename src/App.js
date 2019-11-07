import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList'
import Alert from './components/Alert'
import uuid from 'uuid/v4'

const initialExpenses = [
  { id: uuid(), charge: 'rent', amount: 1600 },
  { id: uuid(), charge: 'car payment', amount: 400 },
  { id: uuid(), charge: 'credit card bill', amount: 1200 }
];


function App() {
  // ********************** state value ********************
  // all expenses, and expense
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState('')
  // single amount
  const [amount, setAmount] = useState('')
  // Alert
  const [alert, setAlert] = useState({ show: false })
  // Edit
  const [edit, setEdit] = useState(false)
  //Edit item
  const [id, setId] = useState(0);
  // ********************** functionality ********************
  // Handle Charge
  const handleCharge = e => {
    setCharge(e.target.value)
  }
  // Handle Amount
  const handleAmount = e => {
    setAmount(e.target.value)
  }
  // Handle Alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({ show: false })
    }, 5000)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (charge !== '' && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: 'success', text: 'item edited' });
      } else {
        const singleExpense = {
          id: uuid(),
          charge: charge,
          amount: amount
        }
        setExpenses([...expenses, singleExpense])
        handleAlert({ type: 'success', text: 'item added' })
      }
      setCharge('')
      setAmount('')
    } else {
      // handle alert called
      handleAlert({
        type: 'danger',
        text: `charge can't be empty value and amount value has to be bigger thn zero `
      })
    }
  }

  // Clear all items
  const clearItems = () => {
    console.log('Cleared all items');
    setExpenses([]);
    handleAlert({ type: 'danger', text: 'all items deleted' })
  }

  // Handle delete 
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    console.log(tempExpenses);
    setExpenses(tempExpenses);
    handleAlert({ type: 'danger', text: 'item deleted' })
  }
  // Handle edit 
  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id)
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>budget calculator</h1>
      <main className='App'>
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>total spending : <span className='total'>
        $ {expenses.reduce((acc, curr) => {
          return (acc += parseInt(curr.amount));
        }, 0)}
      </span></h1>
    </>
  )
}

export default App;
