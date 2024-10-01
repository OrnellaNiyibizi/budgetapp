import React from 'react';

export default function BudgetAlert({ categoryTotals, budgetLimits, currency, onClose }) {
  const alerts = Object.entries(categoryTotals).filter(([category, total]) => {
    const limit = budgetLimits[category];
    return limit && total > limit * 0.8;
  });

  if (alerts.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h3 className="text-xl font-bold mb-2">Budget Alerts</h3>
        {alerts.map(([category, total]) => (
          <div key={category} className="text-red-500">
            Warning: {category} expenses ({currency}{total}) are nearing the budget limit ({currency}{budgetLimits[category]})
          </div>
        ))}
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
}