import { combineReducers } from "@reduxjs/toolkit";
import { manageFoodReducer } from "./foodManager/slice";
import { manageShopReducer } from "./shopManager/slice";
import { manageAuthenReducer } from "./authenManager/slice";
import { managePaymentReducer } from "./paymentManager/slice";
import { manageCartReducer } from "./cartManager/slice";
import { manageTransactionReducer } from "./transactionManager/slice"

export const rootReducer = combineReducers({
  manageFood: manageFoodReducer,
  manageShop: manageShopReducer,
  manageAuthen: manageAuthenReducer,
  managePayment: managePaymentReducer,
  manageCart: manageCartReducer,
  manageTransaction: manageTransactionReducer,
});
