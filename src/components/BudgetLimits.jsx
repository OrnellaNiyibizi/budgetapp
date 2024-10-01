import React, { useState } from 'react';

function BudgetLimits({ setBudgetLimit, budgetLimits }) {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category && limit) {
      setBudgetLimit(category, parseFloat(limit));
      setCategory('');
      setLimit('');
    }
  };

  return (
    <div className="form-container">
      <div>
        <h1 className="main-title-app">My Budget App</h1>

        <div className="budget-limits-list">
          {Object.keys(budgetLimits).length === 0 ? (
            <div>No budget limits set</div>
          ) : (
            <>
              <h3 className="budget-limits-subtitle">Current Budget Limits</h3>
              <ul className="budget-limits-items">
                {Object.entries(budgetLimits).map(([category, limit]) => (
                  <li key={category} className="budget-limit-item">
                    {category}: ${limit}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>


      <form onSubmit={handleSubmit}>
        <div className="form-group">

          <input
            className="form-input"
            id="category"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="form-group">

          <input
            className="form-input"
            id="limit"
            type="number"
            placeholder="Limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="form-button" type="submit">
            Set Limit
          </button>
        </div>
      </form>
    </div>
  );
}

export default BudgetLimits;