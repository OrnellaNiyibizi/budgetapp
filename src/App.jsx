import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseSummary from './components/ExpenseSummary';
import BudgetLimits from './components/BudgetLimits';
import BudgetAlert from './components/BudgetAlert';
import useExpenses from './hooks/useExpenses';
import useBudgetLimits from './hooks/useBudgetLimits';
import './App.css';

function App() {
  const { expenses, addExpense } = useExpenses();
  const { budgetLimits, setBudgetLimit } = useBudgetLimits();
  const [filter, setFilter] = useState({ category: '', startDate: '', endDate: '' });
  const [currency, setCurrency] = useState('RWF');
  const [showAlert, setShowAlert] = useState(false);
  const [categoryTotals, setCategoryTotals] = useState({});

  // Calculate the total expenses per category
  useEffect(() => {
    const totals = expenses.reduce((acc, expense) => {
      const { category, amount } = expense;
      acc[category] = (acc[category] || 0) + parseFloat(amount);
      return acc;
    }, {});
    setCategoryTotals(totals);
  }, [expenses]);

  useEffect(() => {
    const exceedsBudget = Object.entries(categoryTotals).some(([category, total]) => {
      const limit = budgetLimits[category];
      return limit && total > limit * 0.8;
    });

    setShowAlert(exceedsBudget);
  }, [categoryTotals, budgetLimits]);


  const filteredExpenses = expenses.filter((expense) => {
    const categoryMatch = filter.category ? expense.category.includes(filter.category) : true;
    const startDateMatch = filter.startDate ? new Date(expense.date) >= new Date(filter.startDate) : true;
    const endDateMatch = filter.endDate ? new Date(expense.date) <= new Date(filter.endDate) : true;
    return categoryMatch && startDateMatch && endDateMatch;
  });

  return (
    <div className="app-container">
      <div className="app-grid">
        <div className="right-panel">
          <BudgetLimits setBudgetLimit={setBudgetLimit} budgetLimits={budgetLimits} />
        </div>
        <div className="center-panel">
          <ExpenseSummary
            expenses={filteredExpenses}

          />
        </div>
        <div className="left-panel">
          <ExpenseForm addExpense={addExpense} expenses={filteredExpenses} />
        </div>
      </div>

      {showAlert && (
        <BudgetAlert
          categoryTotals={categoryTotals}
          budgetLimits={budgetLimits}
          currency={currency}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}

export default App;
