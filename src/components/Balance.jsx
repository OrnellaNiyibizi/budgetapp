import React, { useState, useMemo } from 'react';

export function Balance({ expenses, currency, setCurrency }) {
  const [initialBalance, setInitialBalance] = useState(0);

  const totalExpenses = useMemo(() => 
    expenses.reduce((total, expense) => {
      const amount = parseFloat(expense.amount);
      return total + (isNaN(amount) ? 0 : amount);
    }, 0), 
    [expenses]
  );

  const totalBalance = useMemo(() => 
    initialBalance - totalExpenses, 
    [initialBalance, totalExpenses]
  );

  return (
    <div>
      <label htmlFor="initial-balance" style={{ display: 'block', marginBottom: '8px' }}>
        Initial Balance
      </label>
      <div className='flex flex-row flex-wrap gap-1'>
        <input
          id="initial-balance"
          type="text"
          placeholder={initialBalance}
          onChange={(e) => setInitialBalance(Number(e.target.value))}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#f5f5f5',
            fontSize: '1rem',
            marginBottom: '16px',
          }}
        />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Select Currency:</h3>
        <label>
          <input
            type="radio"
            value="KSH"
            checked={currency === 'KSH'}
            onChange={(e) => setCurrency(e.target.value)}
            style={{ marginRight: '8px' }}
          />
          KSH
        </label>
        <label style={{ marginLeft: '16px' }}>
          <input
            type="radio"
            value="RWF"
            checked={currency === 'RWF'}
            onChange={(e) => setCurrency(e.target.value)}
            style={{ marginRight: '8px' }}
          />
          RWF
        </label>
      </div>

      <h2>Total Balance: {currency} {totalBalance.toFixed(2)}</h2>
    </div>
  );
}
