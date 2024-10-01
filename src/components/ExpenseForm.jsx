import React, { useState } from 'react';

function ExpenseForm({ addExpense, expenses }) {
  const [expense, setExpense] = useState({ amount: '', date: '', category: '' });
  const [filter, setFilter] = useState({ category: '', startDate: '', endDate: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expense.amount && expense.date && expense.category) {
      addExpense(expense);
      setExpense({ amount: '', date: '', category: '' });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const filteredExpenses = expenses.filter((exp) => {
    const categoryMatch = filter.category ? exp.category.toLowerCase().includes(filter.category.toLowerCase()) : true;
    const startDateMatch = filter.startDate ? new Date(exp.date) >= new Date(filter.startDate) : true;
    const endDateMatch = filter.endDate ? new Date(exp.date) <= new Date(filter.endDate) : true;
    return categoryMatch && startDateMatch && endDateMatch;
  });

  return (
    <div className="main-container">
      <div className="filter-container">
        <h3 className="filter-title">Filter Expenses</h3>
        <div className="form-group">
          <input
            className="form-input"
            type="text"
            name="category"
            placeholder="Filter by Category"
            value={filter.category}
            onChange={handleFilterChange}
          />
        </div>
        <div className='date-inputs'>
          <div className="form-group date-input">
            <label htmlFor="startDate">Start Date:</label>
            <input
              className="form-input"
              type="date"
              name="startDate"
              placeholder="Start Date"
              value={filter.startDate}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group date-input">
            <label htmlFor="endDate">End Date:</label>
            <input
              className="form-input"
              type="date"
              name="endDate"
              placeholder="End Date"
              value={filter.endDate}
              onChange={handleFilterChange}
            />
          </div>
        </div>

      </div>
      <div className="expense-list-container">
        <h3 className="expense-list-title">Current Expenses</h3>
        {filteredExpenses.length === 0 ? (
          <div>No expenses found.</div>
        ) : (
          <ul className="expenses-items">
            {filteredExpenses.map((exp, index) => (
              <li key={index} className="expense-item">
                <span>{exp.category}: ${exp.amount} on {exp.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="">
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
            <input
              className="form-input"
              type="date"
              value={expense.date}
              onChange={(e) => setExpense({ ...expense, date: e.target.value })}
            />
          </div>
          <div className='new-expense-container'>
            
            <div className="form-group expense-list-item">
              <input
                className="form-input"
                type="text"
                placeholder="Category"
                value={expense.category}
                onChange={(e) => setExpense({ ...expense, category: e.target.value })}
              />
            </div>
            <div className="form-group expense-list-item">
              <input
                className="form-input"
                type="number"
                placeholder="Amount"
                value={expense.amount}
                onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
              />
            </div>
          </div>

          <button className="form-button" type="submit">New Expense</button>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
