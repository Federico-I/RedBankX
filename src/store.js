const initialState = {
  balance: 0,
  loan: 0,
  loanPuropse: "",
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case "action/deposit":
      return{...state, balance: state.balance + action.payload};

    case "action/withdraw":
      return{...state, balance: state.balance - action.payload};

    case "account/requestLoan":
      if (state.loan > 0) return state;
      // Later
      return { ...state, loan: action.payload };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      }
    default: 
      return state;
  }
}