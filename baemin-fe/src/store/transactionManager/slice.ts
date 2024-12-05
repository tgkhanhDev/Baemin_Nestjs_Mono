import { createSlice } from "@reduxjs/toolkit";
import { getTransaction } from "./thunk";
import { Transaction } from "@/src/types/transaction";

type stateType = {
  transaction: Transaction[];
  loading: boolean;
};

const initialState: stateType = {
  transaction: [],
  loading: false,
};

export const manageTransactionSlice = createSlice({
  name: "manageTransaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransaction.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(getTransaction.fulfilled, (state, { payload }) => {
      state.transaction = payload;
      state.loading = false;
    });
  },
});

export const { reducer: manageTransactionReducer, actions: manageTransactionActions } =
  manageTransactionSlice;
