import { combineReducers } from "@reduxjs/toolkit";
import { manageFoodReducer } from "./foodManager/slice";
import { manageShopReducer } from "./shopManager/slice";
import { manageAuthenReducer } from "./authenManager/slice";
import { managePaymentReducer } from "./paymentManager/slice";

export const rootReducer = combineReducers({
  manageFood: manageFoodReducer,
  manageShop: manageShopReducer,
  manageAuthen: manageAuthenReducer,
  managePayment: managePaymentReducer
});
