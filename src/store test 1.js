import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/AccountSlice";
import customerReducer from "./features/customers/CustomerSlice";



//////////////// Combining Reducers //////////////////

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// In Redux we don't dispatch actions directly into the reducer but to the store instead.

const store = createStore(rootReducer);
