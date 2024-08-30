import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPuropse: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },

    // funtion Prepare() DATA for REDUCER
    requestLoan: {
      prepare( amount, purpose ) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPuropse = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      }, 
    },
    payload(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPuropse = "";
    },
    cconvertingCurrency(state) {
      state.isLoading = false;
    }
  },
});


export const { withdraw, requestLoan, payload } = accountSlice.actions;

export function deposit(amount, currency) {
  if ( currency === "USD" ) return { 
    type: "account/deposit", 
    payload: amount, 
  };

  // MIDDLEWEAR - ( TO FETCH DATA ) Thunk
  return async function(dispatch, getState) {
  // fetch asyc action to execute before send anything to the store
    dispatch({ type: "account/convertingCurrency" });

    // API call
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);

    const data = await res.json();
    //console.log(data);
    const converted = data.rates.USD;

    // STORE - return acctin 
    dispatch({ type: "account/deposit", payload: converted });
  }
};

export default accountSlice.reducer;

/*
export default function accountReducer(state = initialStateAccount, action) {
  switch(action.type) {
    case "action/deposit":
      return{ ...state, balance: state.balance + action.payload, isLoading: false };

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
      };

      case "account/convertingCurrency":
        return { ...state, isLoading: true };

    default: 
      return state;
  }
}

///// COMP //////
export function deposit(amount, currency) {
  if ( currency === "USD" ) return { 
    type: "account/deposit", 
    payload: amount, 
  };

  // MIDDLEWEAR - ( TO FETCH DATA ) Thunk
  return async function(dispatch, getState) {
  // fetch asyc action to execute before send anything to the store
    dispatch({ type: "account/convertingCurrency" });

    // API call
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);

    const data = await res.json();
    //console.log(data);
    const converted = data.rates.USD;

    // STORE - return acctin 
    dispatch({ type: "account/deposit", payload: converted });
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
*/
