import { combineReducers, createStore } from "redux";


const initialStateCustome = {
  fullName: "",
  nationalID: "",
  createdAt: "",
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
console.log(store.getState())