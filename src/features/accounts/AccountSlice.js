import React from "react";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPuropse: "",
};

export default function accountReducer(state = initialStateAccount, action) {
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


export function deposit(amount, currency) {
  if ( currency === "USD" ) return { 
    type: "account/deposit", 
    payload: amount, 
  };

  return function(dispatch, getState) {
    // API call

    // retunr acctin
  }
};

export function withdraw(amount) {
  return { 
    type: "account/withdraw", 
    payload: amount, 
  };
};

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return {
    type: "account/payLoan"
  };
}

