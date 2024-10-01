import React from 'react';

function ExpenseList({ expenses }) {
  return (
    <div>
      <h3>Expense List</h3>
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              {expense.category}: ${expense.amount} on {expense.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;
