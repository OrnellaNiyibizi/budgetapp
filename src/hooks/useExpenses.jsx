import { useState } from 'react';

export default function useExpenses() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };


  return { expenses, addExpense };
}

