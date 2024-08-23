import { createStore } from "redux";

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

const store = createStore(reducer);

store.dispatch({ type: "account/deposit", payload: 500 });
store.dispatch({ type: "account/withdraw", payload: 200 });
console.log(store.getState());

store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 1000, purpose: "Buys a car" },
});

console.log(store.getState());

store.dispatch({ type: "account/payLoan" });

