const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPuropse: "",
};



function accountReducer(state = initialStateAccount, action) {
  switch(action.type) {
    case "action/deposit":
      return{...state, balance: state.balance + action.payload};

    case "action/withdraw":
      return{...state, balance: state.balance - action.payload};

    case "account/requestLoan":
      if (state.loan > 0) return state;
      // Later
      return { ...state, loan: action.payload, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount,
      };

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


function deposit(amount) {
  return { 
    type: "account/deposit", 
    payload: amount, 
  }
};

function withdraw(amount) {
  return { 
    type: "account/withdraw", 
    payload: amount, 
  };
};

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

function payLoan() {
  return {
    type: "account/payLoan"
  };
}