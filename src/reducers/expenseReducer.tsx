export const initialState = {
  expenses: [],
  budgetLimits: {}
};

export const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload]
      };
    case 'UPDATE_BUDGET_LIMIT':
      return {
        ...state,
        budgetLimits: {
          ...state.budgetLimits,
          [action.payload.category]: action.payload.limit
        }
      };
    default:
      return state;
  }
};