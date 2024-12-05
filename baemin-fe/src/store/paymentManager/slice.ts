import { createSlice } from "@reduxjs/toolkit";
import { createPaymentThunk, getPaymentByAccountIdThunk, payForPaymentThunk } from "./thunk";
import { Payment, PaymentHistory } from "@/src/types/payment";
import { message } from "antd";

type StateType = {
  status: string;
  loading: boolean;
  loadingPay: boolean;
  payment: PaymentHistory[];
};

const initialState: StateType = {
  status: "",
  loading: false,
  loadingPay: false,
  payment: [],
};

export const managePaymentSlice = createSlice({
  name: "managePayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(createPaymentThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        message.success("Đặt hàng thành công");
        localStorage.removeItem("orderData");
      })
      .addCase(createPaymentThunk.rejected, (state, { payload }) => {
        state.loading = false;
        message.error("Đặt hàng thất bại! Vui lòng thử lại sau");
      })
      .addCase(getPaymentByAccountIdThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getPaymentByAccountIdThunk.fulfilled, (state, { payload }) => {
        state.payment = payload;
        state.loading = false;
      })
      .addCase(payForPaymentThunk.pending, (state, { payload }) => {
        state.loadingPay = true;
      })
      .addCase(payForPaymentThunk.fulfilled, (state, { payload }) => {
        state.loadingPay = false;
        message.success("Xác nhận thành công");
      })
      .addCase(payForPaymentThunk.rejected, (state, { payload }) => {
        state.loadingPay = false;
        message.error("Xác nhận thất bại! Vui lòng thử lại sau");
      })
  },
});

export const { reducer: managePaymentReducer, actions: managePaymentActions } =
  managePaymentSlice;
