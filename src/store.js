import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPuropse: "",
};

const initialStateCustome = {
  fullName: "",
  nationalID: "",
  createdAt: "",
} 

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

/////////////////////////////////////////////////
//             Reducer - Logic
/////////////////////////////////////////////////

function customerReducer( state = initialStateCustome, action) {
  switch ( action.type ) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default: 
      return state;
  }
}

//////////////// Combining Reducers //////////////////

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// In Redux we don't dispatch actions directly into the reducer but to the store instead.

const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "Buys a car" },
// });

// const ACCOUNT_DEPOSIT = "account/deposit";

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

// console.log(store.getState());
// store.dispatch({ type: "account/payLoan" });

function createCustomer(fullName, nationalID) {
  return{
    type: "customer/createCustomer",
    payload: {
      fullName, nationalID, createdAt: new Date().toISOString()
    },
  };
}

function updateName(fullName) {
  return { type: "account/updateName", payload: fullName };
}

store.dispatch(createCustomer("Threxos Karnos", "8624907252"));
store.dispatch(deposit(250));
console.log(store.getState());