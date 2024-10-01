import { useState } from 'react';

export default function useBudgetLimits() {
  const [budgetLimits, setBudgetLimits] = useState({});

  const setBudgetLimit = (category, limit) => {
    setBudgetLimits({ ...budgetLimits, [category]: limit });
  };

  return { budgetLimits, setBudgetLimit };
}