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
  // ********************** functionality ********************
  const handleCharge = e => {
    setCharge(e.target.value)
  }
  const handleAmount = e => {
    setAmount(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()

    if (charge !== '' && amount > 0) {
      const singleExpense = {
        id: uuid(),
        charge: charge,
        amount: amount
      }
      setExpenses([...expenses, singleExpense])
      setCharge('')
      setAmount('')
    } else {
      // handle alert called
    }
  }



  return (
    <>
      <Alert />
      <h1>budget calculator</h1>
      <main className='App'>
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
        />
        <ExpenseList expenses={expenses} />
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
